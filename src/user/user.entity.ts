import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { userRole } from './user.enum';
import { Lead } from 'src/lead/lead.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'name', nullable: true, type: 'varchar', length: 255 })
  name?: string;

  @Column({ name: 'email', nullable: true, type: 'varchar', length: 255 })
  email?: string;

  @Column({ name: 'phone', nullable: true, type: 'varchar', length: 15 })
  phone?: string;

  @Column({ name: 'password', nullable: true, type: 'varchar', length: 215 })
  password?: string;

  @Column({ type: 'enum', enum: userRole, default: userRole.CP })
  role?: userRole;

  @OneToMany(() => Lead, (lead) => lead.owner)
  leads?: Lead[];
}
