import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import {
  CreateProductResponse,
  GetProductsResponse,
} from './interfaces/products.interface';
import { Products } from './entity/product.entity';

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
        createdAt: new Date(),
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
}
