import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
export class Role extends BaseEntity{
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;
}
