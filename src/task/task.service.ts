import { commonCreateUpdateResponseDto, ResponseDto } from 'src/common/dto';
import { CreateTaskDto, TaskDto, TaskFindDto } from './task.dto';
import { TaskRepository } from './task.repository';
import { Injectable } from '@nestjs/common';
import { metadata } from 'reflect-metadata/no-conflict';

@Injectable()
export class TaskService {
  constructor(private readonly repo: TaskRepository) {}

  async createTask(
    dto: CreateTaskDto,
  ): Promise<ResponseDto<commonCreateUpdateResponseDto>> {
    const result = await this.repo.create(dto);

    return {
      data: { id: result.id, message: 'Task created successfully' },
      metaData: {},
    };
  }

  async updateTask(
    id: number,
    dto: CreateTaskDto,
  ): Promise<ResponseDto<commonCreateUpdateResponseDto>> {
    await this.repo.updateTask(id, dto);

    return {
      data: { id, message: 'Task updated successfully' },
      metaData: {},
    };
  }

  async getTaskDetails(id: number): Promise<ResponseDto<TaskDto>> {
    const result = await this.repo.getDetails(id);

    if (!result) {
      throw new Error('Task not found'); // better: NotFoundException
    }

    return {
      data: result as TaskDto,
      metaData: {},
    };
  }

  async getList(dto: TaskFindDto): Promise<ResponseDto<TaskDto[]>> {
    const { data: rows, total } = await this.repo.getTaskList(dto);

    const data = rows.map((task) => this.mapDto(task));

    return {
      data,
      metaData: {
        total,
        page: dto.page ?? 1,
        limit: dto.limit ?? 10,
      },
    };
  }

  private mapDto(task: any): TaskDto {
    return {
      id: task.id,
      title: task.title,
      dueAt: task.dueAt,
      status: task.status,
      taskType: task.taskType,
    };
  }
}
