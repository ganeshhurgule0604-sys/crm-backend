import { IsOptional } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export enum TaskStatus {
  ACTIVE = 'active',
  INACTIVE = 'in_active',
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
