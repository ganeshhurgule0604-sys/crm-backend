import { Column } from 'typeorm';

export class BaseEntity {
  @Column({
    type: 'date',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt?: Date;
  @Column({
    type: 'date',
    name: 'created_at',
  })
  updatedAt?: Date;
  @Column({
    type: 'date',
    name: 'created_at',
  })
  deletedAt?: Date;

  @Column({
    type: 'integer',
    name: 'created_by',
  })
  createdBy?: number;

  @Column({
    type: 'integer',
    name: 'updated_by',
  })
  updatedBy?: number;

  @Column({
    type: 'integer',
    name: 'deleted_by',
  })
  deletedBy?: number;
}
