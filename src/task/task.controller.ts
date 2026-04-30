import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // ➕ Create Task
  @Post()
  create(@Body() body: Partial<Task>) {
    return this.taskService.create(body);
  }

  // 📋 Get All Tasks
  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  // 🔍 Get Single Task
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.taskService.findOne(id);
  }

  // ✏️ Update Task
  @Patch(':id')
  update(@Param('id') id: number, @Body() body: Partial<Task>) {
    return this.taskService.update(id, body);
  }

  // ❌ Delete Task
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.taskService.remove(id);
  }
}
