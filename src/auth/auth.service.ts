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

    // Check if username or password is too short/long
    if (username.length < 4 || username.length > 45) {
      throw new UnauthorizedException(
        'El nombre de usuario debe tener entre 4 y 45 caracteres',
      );
    }

    // Check if password is too short
    if (givenPassword.length < 8 || givenPassword.length > 255) {
      throw new UnauthorizedException(
        'La contraseña debe tener entre 8 y 255 caracteres',
      );
    }
    console.log('aaaa' + password);
    return this.userService.create({
      username,
      password,
    });
  }
}
