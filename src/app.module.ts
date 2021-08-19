import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

// modules
import { UsersModule } from './modules';

// entities
import { Users } from './entities';

import * as dotenv from 'dotenv';

dotenv.config();

const { TYPEORM_HOST, TYPEORM_USERNAME, TYPEORM_PASSWORD, TYPEORM_DATABASE } = process.env;

@Module({
  imports: [
    UsersModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/**/*.graphql'],
      installSubscriptionHandlers: true,
      context: ({ req }) => ({ headers: req.headers }),
      debug: true,
      introspection: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: TYPEORM_HOST,
      username: TYPEORM_USERNAME,
      password: TYPEORM_PASSWORD,
      database: TYPEORM_DATABASE,
      entities: [Users],
      synchronize: true,
      retryDelay: 3000,
      retryAttempts: 10,
      keepConnectionAlive: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
