import { AuthRegisterDto } from './dto/auth-register.dto';
import { ClassSerializerInterceptor, Get, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { User } from './user.entity';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private authService: AuthService,
  ){}

  @Get()
  async getUsers(): Promise<User[]>{
    return this.authService.getUsers();
  }

  @Post('/signup')
  async signUp(@Body(ValidationPipe) authRegisterDto: AuthRegisterDto): Promise<void>{
    return this.authService.signUp(authRegisterDto);
  }

  @Post('/signin')
  async signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto){
    return await this.authService.signIn(authCredentialsDto);
  }
}
