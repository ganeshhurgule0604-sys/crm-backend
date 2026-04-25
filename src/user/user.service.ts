import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserRequestDto, UserDto, userListDto } from './user.dto';
import { commonCreateUpdateResponseDto } from './../common/dto';
import { ResponseDto } from 'src/common/dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/auth/auth.dto';
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  userResponseDto;
  async createUser(
    dto: CreateUserRequestDto,
  ): Promise<ResponseDto<commonCreateUpdateResponseDto>> {
    const result = await this.createUserFromDto(dto);

    return {
      data: { id: result?.id, message: 'User Created Successfully' },
      metaData: {},
    };
  }

  async createUserFromDto(dto: CreateUserRequestDto) {
    if (dto.email) {
      await this.checkDuplicate(dto.email, 'email');
    }

    if (dto.phone) {
      await this.checkDuplicate(dto.phone, 'phone');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const hashedPassword: string = await bcrypt.hash(dto.password, 10);
    dto.password = hashedPassword;
    const result = await this.userRepository.createUser({
      ...dto,
      password: hashedPassword,
    });
    return result;
  }

  async updateUser(
    id: number,
    dto: Partial<CreateUserRequestDto>,
  ): Promise<ResponseDto<commonCreateUpdateResponseDto>> {
    const user = await this.userRepository.userDetails(id);

    if (!user) {
      throw new NotFoundException('User Not found');
    }

    if (dto.email) {
      await this.checkDuplicate(dto.email, 'email', id);
    }

    if (dto.phone) {
      await this.checkDuplicate(dto.phone, 'phone', id);
    }

    await this.userRepository.update(id, dto);

    return {
      data: {
        id: id,
        message: 'user updated successfully',
      },
      metaData: {},
    };
  }

  async getUserDetails(id: number): Promise<ResponseDto<UserDto>> {
    const result = await this.userRepository.userDetails(id);
    if (!result) {
      throw new NotFoundException('User not found');
    }

    return {
      data: this.mapUser(result),
      metaData: {},
    };
  }

  async getUserList(dto: userListDto) {
    const [data, count] = await this.userRepository.userList(dto);

    return {
      data: data.map((x) => this.mapUser(x)),

      metaData: {
        total: count,
        page: dto.page,
        limit: dto.limit,
      },
    };
  }

  private mapUser(result: User) {
    return {
      id: result?.id,
      name: result?.name,
      email: result?.email,
      phone: result?.phone,
      role: result?.role,
    };
  }
  async checkDuplicate(value: string, field: 'email' | 'phone', id?: number) {
    const existingUser = await this.userRepository.findUserByParam(
      value,
      field,
    );

    if (id && existingUser && existingUser.id !== id) {
      throw new ConflictException(`${field} already exists`);
    }
  }

  async validateUser(dto: LoginDto) {
    if (dto.email) {
      const existingUser = await this.userRepository.findUserByParam(
        dto.email,
        'email',
      );
      if (!existingUser) {
        throw new NotFoundException('User not  found');
      }
      return existingUser;
    }

    if (dto.phone) {
      const existingUser = await this.userRepository.findUserByParam(
        dto.phone,
        'phone',
      );
      if (!existingUser) {
        throw new NotFoundException('User not  found');
      }
      return existingUser;
    }
  }
}
