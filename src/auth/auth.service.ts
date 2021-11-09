import { RoleRepository } from './../role/role.repository';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private roleRepository: RoleRepository
  ){}

  async getUsers(): Promise<User[]>{
    const users = await this.userRepository.getUsers();
    for(var user of users){
      user.role = await this.roleRepository.findOne(user.roleId);
    }
    return users;
  }

  async signUp(authRegisterDto: AuthRegisterDto): Promise<void>{
    const {roleId} = authRegisterDto;
    const role = await this.roleRepository.findOne(roleId);
    if(!role){
      authRegisterDto.roleId = "";
    }
    else{
      authRegisterDto.role = role;
    }

    return this.userRepository.signUp(authRegisterDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto){
    const username = await this.userRepository.validateUserPassword(authCredentialsDto);
    
    if(!username){
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
