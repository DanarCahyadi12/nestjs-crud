import { Controller, Post, Body } from '@nestjs/common';
import { SignupService } from './signup.service';
import { UserDto } from 'src/user/dto/user.dto';

@Controller('signup')
export class SignupController {
  constructor(private readonly signUpService: SignupService) {}
  @Post()
  async signUp(@Body() user: UserDto) {
    return this.signUpService.signUp(user);
  }
}
