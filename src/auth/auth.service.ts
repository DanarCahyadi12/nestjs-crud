import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ResponseAuth } from './interfaces/auth.interface';
import { SignInDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from './interfaces/auth.interface';
import { Response } from 'express';

@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS = 10;
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(credentials: SignInDto, res: Response): Promise<ResponseAuth> {
    const { email, password } = credentials;
    try {
      const user = await this.userService.findOneByEmail(email);
      if (!user) throw new BadRequestException('Email or password invalid');
      const passwordMatch = await bcrypt.compare(password, user?.password);
      if (!passwordMatch)
        throw new BadRequestException('Email or password invalid');
      const userPayload: UserPayload = {
        sub: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      };
      const accessToken = await this.generateAccessToken(userPayload);
      const refreshToken = await this.generateRefreshToken(userPayload);
      const salt = await bcrypt.genSalt();
      const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);
      await this.userService.updateToken(user.id, hashedRefreshToken);
      res.cookie('token', refreshToken, {
        maxAge: 60 * 60 * 24 * 1,
        httpOnly: true,
      });
      return {
        status: 'success',
        message: 'Sign in successfully',
        data: {
          accessToken,
        },
      };
    } catch (error) {
      if (error) throw error;
    }
  }

  private async generateAccessToken(payload: UserPayload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: process.env.ACCESS_TOKEN_KEY,
      expiresIn: '20s',
    });
  }
  private async generateRefreshToken(payload: UserPayload): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN_KEY,
      expiresIn: '7d',
    });
  }

  async getAccessToken(
    refreshToken: string,
    idUser: string,
  ): Promise<ResponseAuth> {
    const user = await this.userService.findOneById(idUser);
    if (!user) throw new UnauthorizedException();
    const matchRefreshToken = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );
    if (!matchRefreshToken) throw new UnauthorizedException();
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
      const newAccessToken = await this.generateAccessToken({
        sub: payload.sub,
        name: payload.name,
        email: payload.email,
        createdAt: payload.createdAt,
        role: payload.role,
      });
      return {
        status: 'success',
        message: 'Get access token successfully',
        data: {
          accessToken: newAccessToken,
        },
      };
    } catch {
      throw new UnauthorizedException();
    }
  }
}
