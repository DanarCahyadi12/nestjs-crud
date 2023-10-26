import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaModule } from '../prisma/prisma.module';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should return a user', async () => {
    const result = await service.findOneByEmail('danar@gmail.com');
    expect(result).not.toBeNull();
  });
  it('Should have a vaild property', async () => {
    const result = await service.findOneByEmail('danar@gmail.com');

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('email');
    expect(result).toHaveProperty('password');
    expect(result).toHaveProperty('refreshToken');
    expect(result).toHaveProperty('createdAt');
    expect(result).toHaveProperty('role');
  });

  it('Should return a null', async () => {
    const result = await service.findOneByEmail('xiaoxiao112loksx@gmail.com');
    expect(result).toBeNull();
  });
});
