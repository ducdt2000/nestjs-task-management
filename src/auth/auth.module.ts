import { RoleRepository } from './../role/role.repository';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, RoleRepository]),
    JwtModule.register({
      secret: 'duc-secret',
      signOptions: {
        expiresIn: 3600,
      }
    }),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
