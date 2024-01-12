import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthForgetDTO } from './dto/auth-forget.dto';
import { AuthResetDTO } from './dto/auth-reset.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
  @Post('login')
  async login(@Body() { email, password }: AuthLoginDTO) {
    return this.authService.login(email, password);
  }
  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    return this.authService.register(body);
  }
  @Post('forget')
  async forget(@Body() { email }: AuthForgetDTO) {
    return this.authService.forget(email);
  }
  @Post('reset')
  async reset(@Body() { password }: AuthResetDTO) {
    return this.authService.reset(password);
  }
  @UseGuards(AuthGuard)
  @Post('me')
  // async me(@User('id') user) {
  async me(@User() user) {
    return { user };
  }
}
