import { Role } from '../auth/enums/roles.enum';
import { Controller, Get, Post, Body, Query, Ip } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { User } from '../user/decorators/user.decorator';
import { ProductService } from './product.service';
import { Request } from 'express';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Roles(Role.Admin)
  async postProducts(
    @Body() productDto: CreateProductDto,
    @User('sub') userID: string,
  ) {
    return await this.productService.createProduct(productDto, userID);
  }

  @Get()
  async getProducts(@Query() query: any, @Ip() ip, req: Request) {
    const limit: number = parseInt(query?.limit) || 1;
    const page: number = parseInt(query?.page) || 50;
    const protocol = req.protocol;
    this.productService.setProtocolAndIP({ protocol, ip });
    return await this.productService.getProducts(limit, page);
  }
}
