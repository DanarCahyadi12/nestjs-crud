import { Role } from '../auth/enums/roles.enum';
import { Controller, Get, Post } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('products')
export class ProductController {
  constructor() {}

  @Post()
  @Roles(Role.Admin)
  postProducts() {
    return 'Products created';
  }

  @Get()
  getProducts() {
    return 'Get products';
  }
}
