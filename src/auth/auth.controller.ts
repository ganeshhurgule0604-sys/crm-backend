import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignUPDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.loginUser(dto);
  }

  @Post('signup')
  signUp(@Body() dto: SignUPDto) {
    return this.authService.signUpUser(dto);
  }
}
