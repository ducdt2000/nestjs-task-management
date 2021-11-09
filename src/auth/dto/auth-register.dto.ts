import { Role } from './../../role/entities/role.entity';
import { IsString, IsUUID } from 'class-validator';
import { AuthCredentialsDto } from './auth-credentials.dto';
export class AuthRegisterDto extends AuthCredentialsDto{
  roleId: string;
  role: Role;
}