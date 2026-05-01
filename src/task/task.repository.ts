import { ILike, Repository } from 'typeorm';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto, TaskFindDto, TaskType } from './task.dto';

export class TaskRepository {
  constructor(
    @InjectRepository(Task) private readonly taskRepo: Repository<Task>,
  ) {}

  create(dto: CreateTaskDto) {
    const task = this.taskRepo.create(dto);

    return this.taskRepo.save(task);
  }

  updateTask(id: number, dto: Partial<CreateTaskDto>) {
    return this.taskRepo.update(id, dto);
  }

  getDetails(id: number) {
    return this.taskRepo.findOneBy({ id });
  }

  async getTaskList(dto: TaskFindDto) {
    const {
      page = 1,
      limit = 10,
      leadId,
      title,
      taskType,
      toDate,
      fromDate,
    } = dto;

    const query = this.taskRepo.createQueryBuilder('task');

    // ✅ Lead filter
    if (leadId) {
      query.andWhere('task.lead_id = :leadId', { leadId });
    }

    // ✅ Title (case-insensitive contains)
    if (title?.trim()) {
      query.andWhere('task.title ILIKE :title', {
        title: `%${title.trim()}%`,
      });
    }

    // ✅ Task Type
    if (taskType) {
      query.andWhere('task.taskType = :taskType', { taskType });
    }

    // ✅ Date filters
    if (fromDate && toDate) {
      query.andWhere('task.dueAt BETWEEN :fromDate AND :toDate', {
        fromDate,
        toDate,
      });
    } else if (fromDate) {
      query.andWhere('task.dueAt >= :fromDate', { fromDate });
    } else if (toDate) {
      query.andWhere('task.dueAt <= :toDate', { toDate });
    }

    // ✅ Pagination fix
    const startIndex = (page - 1) * limit;

    const [data, total] = await query
      .skip(startIndex)
      .take(limit)
      .orderBy('task.dueAt', 'DESC') // optional but recommended
      .getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
    };
  }
}
