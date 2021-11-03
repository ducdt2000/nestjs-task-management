import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()  
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;
}