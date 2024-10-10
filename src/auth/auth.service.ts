import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  salt = bcrypt.genSaltSync(10);

  async signIn(
    username: string,
    userPassword: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(username);

    if (!user) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }

    const compare = await bcrypt.compare(userPassword, user?.password);

    if (!compare) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(username: string, givenPassword: string) {
    const password = bcrypt.hashSync(givenPassword, this.salt);

    const user = await this.userService.findOne(username);

    // Check if user already exists
    if (user) {
      throw new UnauthorizedException('Usuario inválido');
    }

    return this.userService.create({
      username,
      password,
    });
  }
}
