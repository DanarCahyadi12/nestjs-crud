import { Role } from '../auth/enums/roles.enum';
import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Ip,
  Req,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { User } from '../user/decorators/user.decorator';
import { ProductService } from './product.service';
import { Request } from 'express';
import { UpdateProductDto } from './dto/update-product.dto';

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
  async getProducts(@Query() query: any, @Ip() ip, @Req() req: Request) {
    const limit: number = parseInt(query?.limit) || 50;
    const page: number = parseInt(query?.page) || 1;
    const protocol = req.protocol;
    this.productService.setProtocolAndIP({ protocol, ip });
    return await this.productService.getProducts(limit, page);
  }
  @Get(':id')
  async getDetailProduct(@Param('id') id: string) {
    return await this.productService.getDetailProduct(id);
  }

  @Put(':id')
  @Roles(Role.Admin)
  async updateProduct(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
    @User('sub') idUser,
  ) {
    return this.productService.updateProduct(id, dto, idUser);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  async deleteProduct(@Param('id') idProduct: string) {
    return await this.productService.deleteProduct(idProduct);
  }
}
