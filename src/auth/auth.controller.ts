import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { SkipAuth } from './decorators/auth.decorator';
import { User } from '../user/decorators/user.decorator';
import { RefreshTokenGuard } from './guards/refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() credentials: SignInDto) {
    return this.authService.signIn(credentials);
  }

  @SkipAuth()
  @UseGuards(RefreshTokenGuard)
  @Get('token')
  @HttpCode(HttpStatus.OK)
  async getToken(@User(['sub', 'refreshToken']) datas) {
    const { sub, refreshToken } = datas;
    return await this.authService.getAccessToken(refreshToken, sub);
  }
}
