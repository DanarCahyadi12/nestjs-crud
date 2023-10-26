import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/user/dto/user.dto';
import { SignUpResponse } from './interfaces/singup.interface';

@Injectable()
export class SignupService {
  private readonly SALT_ROUNDS = 10;
  constructor(private readonly userService: UserService) {}

  async signUp(user: SignUpDto): Promise<SignUpResponse> {
    const { password, email } = user;
    try {
      const hashedPasssword = await this.hashPassword(password);
      const userExits = await this.userService.findOneByEmail(email);
      if (userExits)
        throw new BadRequestException(
          'Email already registered. Please use another email',
        );
      const userWillCreated: UserDto = {
        ...user,
        password: hashedPasssword,
      };
      const { id } = await this.userService.createUser(userWillCreated);
      return {
        status: 'success',
        message: 'Sign up successfully',
        data: {
          id: id,
        },
      };
    } catch (error) {
      if (error) throw error;
    }
  }

  async hashPassword(password: any): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      bcrypt.genSalt(this.SALT_ROUNDS, (err, salt) => {
        if (err) throw reject(err);
        bcrypt.hash(password, salt, (err, hashedPassword) => {
          if (err) throw reject(err);
          return resolve(hashedPassword);
        });
      });
    });
  }
}
