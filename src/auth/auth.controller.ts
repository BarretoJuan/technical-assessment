import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Post('signup')
  signUp(@Body() signUpDto: Record<string, any>) {
    return this.authService.signUp(signUpDto.username, signUpDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  me(@Request() req) {
    return req.user;
  }
}
