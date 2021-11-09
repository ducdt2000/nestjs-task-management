import { Role } from './../role/entities/role.entity';
import { Column, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { BaseEntity, Entity, PrimaryColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude, Expose, Transform } from 'class-transformer';
@Entity()
@Unique(['username'])
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()  
  id: number;

  @Column()
  username: string;

  @ManyToOne(()=> Role, role => role.id)
  @Transform(({value}) => value.name)
  role: Role;

  @Column()
  roleId: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  @Exclude()
  salt: string;

  async validatePassword(password: string): Promise<boolean>{
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }

  @Expose()
  get describeUser(): string{
    return this.id + ' - ' + this.username;
  }
}