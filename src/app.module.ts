import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SignupModule } from './signup/signup.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, SignupModule, AuthModule],
})
export class AppModule {}
