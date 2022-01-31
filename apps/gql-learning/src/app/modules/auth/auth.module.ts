import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtAccessStrategy } from './strategies/jwt-auth.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { HashModule } from '@flamewow.inc/hash';
import { UserEntity } from '../../db/entities/user.entity';
import { config } from '../../core/config';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), PassportModule, JwtModule.register({ secret: config.jwtAccessSecret }), HashModule],
  providers: [AuthResolver, AuthService, JwtAccessStrategy, JwtRefreshStrategy, LocalStrategy],
  exports: [JwtAccessStrategy],
})
export class AuthModule {}
