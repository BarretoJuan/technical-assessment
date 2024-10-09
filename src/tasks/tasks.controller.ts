import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Headers,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FindTaskDto } from './dto/find-task-dto';
import { FindUserDto } from 'users/dto/find-user.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(AuthGuard)
  @Get('find-tasks')
  findAll() {
    return this.tasksService.findAll();
  }

  @UseGuards(AuthGuard)
  @Post('find-tasks-by-username')
  findTaskByUsername(@Body() body: FindUserDto, @Request() req) {
    const jwt_sub = req.user.sub;
    console.log('BBB ', jwt_sub);

    return this.tasksService.findTaskByUsername(body.username, jwt_sub);
  }

  @UseGuards(AuthGuard)
  @Post('create')
  createTask(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    const jwt_sub = req.user.sub;

    return this.tasksService.createTask(createTaskDto, jwt_sub);
  }

  @UseGuards(AuthGuard)
  @Post('delete')
  deleteTask(@Body() taskId: FindTaskDto, @Request() req) {
    const jwt_sub = req.user.sub;
    return this.tasksService.deleteTask(taskId, jwt_sub);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.tasksService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
  //   return this.tasksService.update(+id, updateTaskDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.tasksService.remove(+id);
  // }
}
