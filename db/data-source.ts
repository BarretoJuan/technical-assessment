import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'tasks',
  synchronize: false,
  migrationsTableName: 'typeorm_migrations',
  migrations: ['db/migrations/*.ts'],
  logging: true,
  entities: [User, Task],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
