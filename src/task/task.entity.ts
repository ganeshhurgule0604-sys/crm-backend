import { CommonEntity } from 'src/common/base.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskStatus, TaskType } from './task.dto';
import { Lead } from 'src/lead/lead.entity';

@Entity()
export class Task extends CommonEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title!: string;

  @Column({ type: 'timestamp', nullable: true })
  dueAt?: Date;

  @ManyToOne(() => User, (user) => user.tasks, { nullable: true })
  @JoinColumn({ name: 'assigned_id' })
  assignee!: User;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.ACTIVE })
  status?: TaskStatus;

  @Column({ type: 'enum', enum: TaskType, nullable: true })
  taskType?: TaskType;

  @ManyToOne(() => Lead, (lead) => lead.tasks, { nullable: true })
  @JoinColumn({ name: 'lead_id' })
  lead?: Lead;
}
