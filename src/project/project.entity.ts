import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { projectStatus } from './projet.enum';
import { Lead } from 'src/lead/lead.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name?: string;

  @Column({
    type: 'enum',
    enum: projectStatus,
    default: projectStatus.INACTIVE,
  })
  status?: projectStatus;

  @Column({ type: 'varchar', length: 255, nullable: true })
  location?: string;

  @OneToMany(() => Lead, (lead) => lead.project)
  leads?: Lead[];
}
