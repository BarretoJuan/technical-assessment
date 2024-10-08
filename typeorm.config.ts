import { Task } from './src/tasks/entities/task.entity';
import { User } from './src/users/entities/user.entity';
import { DataSource } from 'typeorm';
import 'dotenv/config';

export default new DataSource({
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST as any,
  port: parseInt(process.env.DB_PORT, 10) as any,
  username: process.env.DB_USERNAME as any,
  password: process.env.DB_PASSWORD as any,
  database: process.env.DB_NAME as any,
  entities: [User, Task],
  migrations: ['./src/db/migrations/*.ts'],
});
