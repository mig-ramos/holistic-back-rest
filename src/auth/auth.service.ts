import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly JwtService: JwtService) {}

  async createToken() {
    // return this.JwtService.sign();
  }

  async checkToken() {
    //  return this.JwtService.verify();
  }
}
