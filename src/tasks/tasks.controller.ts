import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { CreateTaskDto } from "./dto/create-task.dto";
import { TasksService } from "./tasks.service";
import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { Task, TaskStatus } from './tasks.model';

@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
    if(Object.keys(filterDto).length){
      return this.tasksService.getTaskByFilter(filterDto);
    }
    return this.tasksService.getAllTasks();
  }

  @Get("/:id")
  getTaskById(@Param("id") id: string) {
    const found = this.tasksService.getTaskById(id);
    return found;
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  updateStatusTask(
    @Param('id') id: string,
    @Body('status') status: string
  ): Task{
    const statusTask: TaskStatus = TaskStatus[status];
    return this.tasksService.updateStatus(id, statusTask);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void{
    this.tasksService.deleteTaskById(id);
  }
}
