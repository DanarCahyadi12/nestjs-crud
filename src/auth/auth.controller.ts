import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { SkipAuth } from './decorators/auth.decorator';
import { User } from '../user/decorators/user.decorator';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { Response } from 'express';
import { Cookies } from './decorators/cookies.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() credentials: SignInDto, @Res() res: Response) {
    res.json(await this.authService.signIn(credentials, res));
  }

  @SkipAuth()
  @UseGuards(RefreshTokenGuard)
  @Get('token')
  @HttpCode(HttpStatus.OK)
  async getToken(@User(['sub']) user, @Cookies('token') refreshToken: string) {
    const { sub } = user;
    return await this.authService.getAccessToken(refreshToken, sub);
  }
}
