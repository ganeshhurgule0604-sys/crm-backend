import { CommonEntity } from 'src/common/base.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskStatus } from './task.dto';

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
}
