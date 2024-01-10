import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async createToken() {
    // return this.JwtService.sign();
  }

  async checkToken() {
    //  return this.JwtService.verify();
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
        password,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Email e/ou senha incorretos.');
    }

    return user;
  }

  async forget(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Email está incorreto.');
    }

    //To DO: Enviar o email

    return true;
  }

  async reset(password: string, token: string) {
    // TP DO: Validar o token...

    const id = 0;

    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });

    return true;
  }
}
