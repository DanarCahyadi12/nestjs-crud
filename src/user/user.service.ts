import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(user: UserDto) {
    return await this.prismaService.user.create({
      data: user,
      select: {
        id: true,
      },
    });
  }

  async findOneByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) return null;
    return {
      ...user,
      createdAt: user.createdAt.toISOString(),
    };
  }
}
