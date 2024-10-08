import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 45 })
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('varchar', { length: 45, default: 'Pendiente' })
  status: string;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
