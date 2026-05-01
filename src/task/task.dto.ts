import { IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common/dto';
import { PrimaryGeneratedColumn } from 'typeorm';

export enum TaskStatus {
  ACTIVE = 'active',
  INACTIVE = 'in_active',
}

export enum TaskType {
  CALL = 'call',
  WHATAPP = 'whatapp',
  SMS = 'sms',
  OTHER = 'other',
}
export class TaskDto {
  @PrimaryGeneratedColumn()
  id!: number;

  @IsOptional()
  title?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  dueAt?: Date;

  taskType?: TaskType;

  status?: TaskStatus;
}

export class CreateTaskDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  dueAt?: Date;

  status?: TaskStatus;
}

export class TaskFindDto extends PaginationDto {
  title?: string;

  taskType?: TaskType;

  toDate?: Date;

  fromDate?: Date;

  leadId?: number;
}
