import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity } from '../../../db/entities/user.entity';

@ObjectType()
export class SignInResult {
  @Field()
  user: UserEntity;

  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}

@ObjectType()
export class RefreshTokenResult extends SignInResult {}
