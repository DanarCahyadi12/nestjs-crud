import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SignupModule } from './signup/signup.module';

@Module({
  imports: [UserModule, SignupModule],
})
export class AppModule {}
