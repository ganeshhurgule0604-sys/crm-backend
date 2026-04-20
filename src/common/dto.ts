import { IsOptional } from 'class-validator';

export class ResponseDto<T> {
  data?: T;

  metaData: any;
}

export class PaginationDto {
  limit?: number;

  offset?: number;
}

export class commonCreateUpdateResponseDto {
  message?: string;

  @IsOptional()
  id?: number;
}
