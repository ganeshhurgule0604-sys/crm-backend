import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { projectStatus } from './projet.enum';
import { Lead } from 'src/lead/lead.entity';
import { CommonEntity } from 'src/common/base.entity';

@Entity()
export class Project extends CommonEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name?: string;

  @Column({
    type: 'enum',
    enum: projectStatus,
    default: projectStatus.ACTIVE,
  })
  status?: projectStatus;

  @Column({ type: 'varchar', length: 255, nullable: true })
  location?: string;

  @OneToMany(() => Lead, (lead) => lead.project)
  leads?: Lead[];
}
