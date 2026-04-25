import { IsOptional } from 'class-validator';

export class ResponseDto<T> {
  data?: T;

  metaData: any;
}

export class PaginationDto {
  limit?: number;

  page?: number;
}

export class commonCreateUpdateResponseDto {
  message?: string;

  @IsOptional()
  id?: number;
}
