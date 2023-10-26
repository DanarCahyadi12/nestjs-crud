import { Test, TestingModule } from '@nestjs/testing';
import { SignupService } from './signup.service';
import { UserModule } from '../user/user.module';
import { SignUpDto } from './dto/signup.dto';
import { BadRequestException } from '@nestjs/common';

describe('SignupService', () => {
  let service: SignupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
      providers: [SignupService],
    }).compile();

    service = module.get<SignupService>(SignupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should to be instance of BadRequestException', async () => {
    const data: SignUpDto = {
      name: 'I Ketut Danar Cahyadi',
      email: 'danar@gmail.com',
      password: 'password',
      role: 'admin',
    };
    try {
      await service.signUp(data);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });

  it('Should be have an valid property and valid value', async () => {
    const data: SignUpDto = {
      name: 'I Ketut Danar Cahyadi',
      email: 'danar@gmail.com',
      password: 'password',
      role: 'admin',
    };
    try {
      await service.signUp(data);
    } catch (error) {
      expect(error).toHaveProperty('status');
      expect(error).toHaveProperty('message');
      expect(error.status).toEqual(400);
      expect(error.message).toEqual(
        'Email already registered. Please use another email',
      );
    }
  });
});
