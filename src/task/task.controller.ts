import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, TaskFindDto } from './task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // ➕ Create Task
  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.taskService.createTask(dto);
  }

  // 📋 Get Task List (with filters + pagination)
  @Get()
  getList(@Query() dto: TaskFindDto) {
    return this.taskService.getList(dto);
  }

  // 🔍 Get Single Task
  @Get(':id')
  getDetails(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.getTaskDetails(id);
  }

  // ✏️ Update Task
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateTaskDto) {
    return this.taskService.updateTask(id, dto);
  }
}
