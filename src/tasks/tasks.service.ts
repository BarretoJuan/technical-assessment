import {
  BadRequestException,
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

  createTask(createTaskDto: CreateTaskDto, jwt_sub: string) {
    if (!createTaskDto.title) {
      throw new NotAcceptableException('Ingrese un título');
    }
    if (createTaskDto.title.length < 4 || createTaskDto.title.length > 45) {
      throw new NotAcceptableException(
        'El título debe tener entre 4 y 45 caracteres',
      );
    }
    if (createTaskDto.description && createTaskDto.description.length > 500) {
      throw new NotAcceptableException(
        'La descripción no puede tener más de 500 caracteres',
      );
    }

    try {
      this.tasksRepository.insert({
        ...createTaskDto,
        userId: parseInt(jwt_sub),
      });
    } catch {
      throw new BadRequestException('Error creando la tarea');
    }

    return 'Tarea creada satisfactoriamente';
  }

  findAll() {
    return this.tasksRepository.find();
  }

  async findTaskByUsername(username: string, jwt_sub: string) {
    const user = await this.usersRepository.findOne({
      select: ['id'],
      where: { username: username },
    });
    const userId = user?.id;
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
