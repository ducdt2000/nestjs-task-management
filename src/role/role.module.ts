import { RoleRepository } from './role.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';

@Module({
  imports:[
    TypeOrmModule.forFeature([RoleRepository])
  ],
  controllers: [RoleController],
  providers: [RoleService]
})
export class RoleModule {}
