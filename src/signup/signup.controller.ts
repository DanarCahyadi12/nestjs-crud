import { Controller, Post, Body } from '@nestjs/common';
import { SignupService } from './signup.service';
import { UserDto } from '../user/dto/user.dto';
import { SkipAuth } from '../auth/decorators/auth.decorator';

@SkipAuth()
@Controller('signup')
export class SignupController {
  constructor(private readonly signUpService: SignupService) {}
  @Post()
  async signUp(@Body() user: UserDto) {
    return this.signUpService.signUp(user);
  }
}
