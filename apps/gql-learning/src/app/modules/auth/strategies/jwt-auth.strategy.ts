import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { config } from '../../../core/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IJwtPayload } from '../auth.interfaces';
import { AuthService } from '../auth.service';
import { UserEntity } from '../../../db/entities/user.entity';
import { Request } from 'express';
import { JWT_ACCESS } from '../../../core/constants';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, JWT_ACCESS) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() || ExtractJwt.fromExtractors([(req: Request) => req?.cookies?.Authentication]),
      secretOrKey: config.jwtAccessSecret,
    });
  }

  async validate({ uuid }: IJwtPayload): Promise<UserEntity | null> {
    return this.authService.findUserByUUID(uuid);
  }
}
