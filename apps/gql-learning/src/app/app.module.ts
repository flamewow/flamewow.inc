import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { v4 as uuid } from 'uuid';
import { config } from './core/config';
import { AuthModule } from './modules/auth/auth.module';
import { RecipesModule } from './modules/recipes/recipes.module';
import { ComplexityPlugin } from './core/plugins/complexity.plugin';
import { LoggingPlugin } from './core/plugins/logging.plugin';

@Module({
  imports: [
    AuthModule,
    RecipesModule,
    TypeOrmModule.forRoot(config.databaseConfig),
    GraphQLModule.forRoot({
      // TODO: move to config
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true, // enabled for graphql playground
      // subscriptions: {
      //   'graphql-ws': true,
      // },
    }),
    LoggerModule.forRoot({
      // TODO: move to config
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            ignore: 'pid,hostname',
            singleLine: true,
            levelFirst: true,
            timestampKey: 'time',
            translateTime: true,
          },
        },
        autoLogging: false,
        genReqId: () => uuid(),
        useLevel: 'debug',
        serializers: {
          req: () => undefined, //(req: any) => ({ id: req.id, method: req.method }),
          res: () => undefined, //(res: any) => ({ id: res.statusCode }),
        },
        // customProps: (req: any) => ({ id: req.id, ts: new Date() }),
      },
    }),
  ],
  providers: [ComplexityPlugin, LoggingPlugin],
})
export class AppModule {}
