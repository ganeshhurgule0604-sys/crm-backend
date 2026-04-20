import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';

import {
  BudgetRangeEnum,
  LeadSourceEnum,
  LeadStatus,
  configurationEnum,
} from './lead.enum';
import { Project } from 'src/project/project.entity';
import { User } from 'src/user/user.entity';

@Entity('lead')
export class Lead extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({
    type: 'enum',
    enum: configurationEnum,
    nullable: true,
  })
  configuration?: configurationEnum;

  @Column({
    type: 'enum',
    enum: BudgetRangeEnum,
    nullable: true,
  })
  budget?: BudgetRangeEnum;

  @Column({
    type: 'enum',
    enum: LeadStatus,
    default: LeadStatus.INACTIVE,
  })
  status?: LeadStatus;

  @Column({
    type: 'enum',
    enum: LeadSourceEnum,
    nullable: true,
  })
  source?: LeadSourceEnum;

  @ManyToOne(() => Project, (project) => project.leads)
  project?: Project;

  @ManyToOne(() => User, (user) => user.leads)
  owner?: User;
}
