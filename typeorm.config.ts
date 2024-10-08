import { Task } from './src/tasks/entities/task.entity';
import { User } from './src/users/entities/user.entity';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'tasks',
  entities: [User, Task],
  migrations: ['./src/db/migrations/*.ts'],
});
