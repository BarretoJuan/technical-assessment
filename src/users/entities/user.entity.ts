import { Task } from '../../tasks/entities/task.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 45 })
  username: string;
x
  @Column('varchar', {length: 255})
  password: string;

  @OneToMany((type) => Task, (task) => task.userId)
  tasks: Task[];
}
