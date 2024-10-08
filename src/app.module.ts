import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // import TypeOrmModule
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { User } from './users/entities/user.entity'; //importt User entity
import { Task } from './tasks/entities/task.entity'; //import Task entity
// import { dataSourceOptions } from 'db/data-source'; //import dataSourceOptions

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: TypeOrmModule) => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'tasks',
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
