import { Controller, Get } from '@nestjs/common';
import { User } from './decorators/user.decorator';

@Controller('user')
export class UserController {
  @Get()
  getUser(@User() user) {
    return user;
  }
}
