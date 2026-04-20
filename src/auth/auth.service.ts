import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { authResponseDto, LoginDto, SignUPDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ResponseDto } from 'src/common/dto';
import { User } from 'src/user/user.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUpUser(dto: SignUPDto): Promise<ResponseDto<authResponseDto>> {
    const user = await this.userService.createUserFromDto(dto);
    return this.generateToken(user);
  }

  async loginUser(dto: LoginDto): Promise<ResponseDto<authResponseDto>> {
    const user = await this.userService.validateUser(dto);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const isLoggedIn = await bcrypt.compare(dto.password, user.password);

    if (!isLoggedIn) {
      throw new NotFoundException('Invalid credentials');
    }

    return this.generateToken(user); // ✅ now safe
  }
  private generateToken(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const token = this.jwtService.sign(payload);
    return {
      data: {
        message: 'user registration complted ',
        token: token,
      },
      metaData: {},
    };
  }
}
