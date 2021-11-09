import { CreateRoleDto } from './dto/create-role.dto';
import { EntityRepository, Repository } from "typeorm";
import { Role } from "./entities/role.entity";
import {v4 as uuid} from "uuid";

@EntityRepository(Role)
export class RoleRepository extends Repository<Role>{
  async createRole(createRoleDto: CreateRoleDto): Promise<Role>{
    const role = new Role();

    role.id = uuid();
    role.description = createRoleDto.description;
    role.name = createRoleDto.name;

    await role.save();

    return role;
  }
}