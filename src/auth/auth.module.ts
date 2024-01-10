import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: `FnOR;/Ii]zofC1|tWpv<"7f!0fb*ys^x`,
    }),
  ],
})
export class AuthModule {}
