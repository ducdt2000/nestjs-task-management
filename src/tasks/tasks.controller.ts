import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { CreateTaskDto } from "./dto/create-task.dto";
import { TasksService } from "./tasks.service";
import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { Task } from './task.entity';
import { DeleteResult } from 'typeorm';
import { TaskStatus } from './task-status.enum';

@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto) {
    return this.tasksService.getTasks(filterDto);
  }

  @Get("/:id")
  getTaskById(@Param("id", ParseIntPipe) id: number): Promise<Task> {
    const found = this.tasksService.getTaskById(id);
    return found;
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  updateStatusTask(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: string
  ): Promise<Task>{
    const statusTask: TaskStatus = TaskStatus[status];
    return this.tasksService.updateStatus(id, statusTask);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<void>{
    return this.tasksService.deleteTaskById(id);
  }
}
