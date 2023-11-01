import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import {
  CreateProductResponse,
  GetProductsResponse,
  UpdateProductResponse,
} from './interfaces/products.interface';
import { Products } from './entity/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  protected ip: string;
  protected protocol: string;
  constructor(private readonly prismaService: PrismaService) {}

  async createProduct(
    product: CreateProductDto,
    id: string,
  ): Promise<CreateProductResponse> {
    const result = await this.prismaService.product.create({
      data: {
        title: product.title,
        description: product.description,
        stock: product.stock,
        price: product.price,
        userId: id,
      },
    });
    return {
      status: 'success',
      message: 'Product created successfully',
      data: {
        id: result.id,
      },
    };
  }

  async getProducts(limit: number, page: number): Promise<GetProductsResponse> {
    const offset: number = (page - 1) * limit;
    const totalProducts = await this.prismaService.product.count();
    const totalPages = Math.ceil(totalProducts / limit);
    const products = await this.prismaService.product.findMany({
      skip: offset,
      take: limit,
    });
    const mappedProducts: Products[] = this.mapProducts(products);
    const nextURL = this.getNextURL(limit, page, totalPages);
    const previousURL = this.getPreviousURL(limit, page);
    return {
      status: 'success',
      message: 'Get products successfully',
      data: {
        totalProducts: totalProducts,
        totalPages: totalPages,
        limit: limit,
        prev: previousURL,
        currentPage: page,
        next: nextURL,
        items: mappedProducts,
      },
    };
  }
  mapProducts(products: any) {
    return products.map((product: any) => {
      return {
        ...product,
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
      };
    });
  }
  setProtocolAndIP({ protocol, ip }) {
    this.protocol = protocol;
    this.ip = ip;
  }
  getURL() {
    return `${this.protocol}://${this.ip}:${process.env.SERVER_PORT}/products`;
  }
  getPreviousURL(limit: number, page: number): string | null {
    if (page > 1) return `${this.getURL()}?limit=${limit}&page=${page - 1}`;
    return null;
  }
  getNextURL(limit: number, page: number, totalPages: number): string | null {
    if (page >= totalPages) return null;
    return `${this.getURL()}?limit=${limit}&page=${page + 1}`;
  }

  async updateProduct(
    id: string,
    dto: UpdateProductDto,
    idUser: string,
  ): Promise<UpdateProductResponse> {
    try {
      const product = await this.prismaService.product.findUnique({
        where: {
          id: id,
        },
      });
      if (!product) throw new NotFoundException('Product not found');
      const productUpdated = await this.prismaService.product.update({
        where: {
          id: id,
        },
        data: {
          title: dto.title,
          description: dto.description,
          price: dto.price,
          stock: dto.stock,
          userId: idUser,
          updatedAt: new Date(),
        },
      });
      const formatedProduct = {
        ...productUpdated,
        createdAt: productUpdated.createdAt.toISOString(),
        updatedAt: productUpdated.updatedAt.toISOString(),
      };
      return {
        status: 'success',
        message: 'Update product successfully',
        data: {
          items: formatedProduct,
        },
      };
    } catch (error) {
      if (error) throw error;
    }
  }
}
