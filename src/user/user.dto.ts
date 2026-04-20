import { IsOptional, IsEmail, IsString, MinLength } from 'class-validator';
import { userRole } from './user.enum';
import { PaginationDto } from 'src/common/dto';

export class UserDto {
  @IsOptional()
  id?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  phone?: string;

  role?: userRole;
}

export class CreateUserRequestDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  email?: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  role?: userRole;

  @IsOptional()
  password?: string;
}

export class userListDto extends PaginationDto {
  name?: string;

  email?: string;

  phone?: string;

  role?: userRole;
}
