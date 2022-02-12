import { HashModule } from '@flamewow.inc/nest/hash';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsService } from './posts.service';
import { PrismaService } from './prisma.service';
import { UsersService } from './users.service';

@Module({
  imports: [HashModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, PostsService, UsersService],
})
export class AppModule {}
