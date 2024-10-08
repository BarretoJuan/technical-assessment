import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // import TypeOrmModule
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import 'dotenv/config';
import { User } from './users/entities/user.entity'; //importt User entity
import { Task } from './tasks/entities/task.entity'; //import Task entity
// import { dataSourceOptions } from 'db/data-source'; //import dataSourceOptions

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: TypeOrmModule) => ({
        type: process.env.DB_TYPE as any,
        host: process.env.DB_HOST as any,
        port: parseInt(process.env.DB_PORT, 10) as any,
        username: process.env.DB_USERNAME as any,
        password: process.env.DB_PASSWORD as any,
        database: process.env.DB_NAME as any,
      }),
    }),
    UsersModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
