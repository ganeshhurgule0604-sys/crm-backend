import { userRole } from 'src/user/user.enum';

export class LoginDto {
  name?: string;

  email?: string;

  role?: userRole;

  phone?: string;

  password?: string;
}

export class SignUPDto {
  emial?: string;

  phone?: string;

  password?: string;
}

export class authResponseDto {
  message?: string;

  token?: string;
}

export class payloadDto {
  sub?: number;
  email?: string;
  role?: string;
}
