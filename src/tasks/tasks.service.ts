import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { AuthController } from 'auth/auth.controller';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createTaskDto: CreateTaskDto) {
    return 'This action adds a new task';
  }

  findAll() {
    return this.tasksRepository.find();
  }

  async findTaskByUsername(username: string, jwt_sub: string) {
    const user = await this.usersRepository.findOne({
      select: ['id'],
      where: { username: username },
    });
    console.log('aaa', user);
    const userId = user?.id;
    console.log('user id ', userId);
    console.log('sub ', jwt_sub);

    if (!userId) {
      throw new UnauthorizedException('User not found');
    }

    if (jwt_sub != userId.toString()) {
      throw new UnauthorizedException(
        'You are not authorized to view the tasks of this user',
      );
    }

    return this.tasksRepository.find({ where: { userId: userId } });
  }

  findOne(id: number) {
    return `1This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `2This action updates a #${id} task`;
  }

  remove(id: number) {
    return `3This action removes a #${id} task`;
  }
}
