import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskRepository } from './task.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [TaskService,TaskRepository],
})
export class TaskModule {}
