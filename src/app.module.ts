import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SignupModule } from './signup/signup.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './products/product.module';

@Module({
  imports: [UserModule, SignupModule, AuthModule, ProductModule],
})
export class AppModule {}
