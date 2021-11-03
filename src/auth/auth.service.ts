import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ){}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>{
    return this.userRepository.signUp(authCredentialsDto);
  }
}
