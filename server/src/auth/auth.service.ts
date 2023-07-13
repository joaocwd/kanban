import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {SHA256} from "crypto-js"
import { User } from './users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  public getTokenForUser(user: User): string {
    return this.jwtService.sign({
      email: user.email,
      sub: user.id
    });
  }

  public async hashPassword(password: string): Promise<string> {
    return SHA256(password).toString();
  }
}
