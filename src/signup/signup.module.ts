import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { SignupController } from './signup.controller';
import { SignupService } from './signup.service';

@Module({
  imports: [UserModule],
  controllers: [SignupController],
  providers: [SignupService],
})
export class SignupModule {}
