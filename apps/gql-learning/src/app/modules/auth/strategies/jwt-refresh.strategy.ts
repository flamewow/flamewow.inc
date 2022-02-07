import { config } from '@gql-learning/core/config';
import { JWT_REFRESH } from '@gql-learning/core/constants';
import { UserEntity } from '@gql-learning/db/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IJwtPayload } from '../auth.interfaces';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, JWT_REFRESH) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: config.jwtRefreshSecret,
    });
  }

  async validate({ uuid }: IJwtPayload): Promise<UserEntity | null> {
    return this.authService.findUserByUUID(uuid);
  }
}
