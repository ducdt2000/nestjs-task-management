import { CreateTaskDto } from "./dto/create-task.dto";
import { TasksService } from "./tasks.service";
import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { Task, TaskStatus } from './tasks.model';

@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get("/:id")
  getTaskById(@Param("id") id: string) {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id/:status')
  updateStatusTask(
    @Param('id') id: string,
    @Param('status') status: string
  ): boolean{
    const statusTask: TaskStatus = TaskStatus[status];
    if(statusTask === undefined){
      return false;
    }
    return this.tasksService.updateStatus(id, statusTask);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): boolean{
    return this.tasksService.deleteTaskById(id);
  }
}
