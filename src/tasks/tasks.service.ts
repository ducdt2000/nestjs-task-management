import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find(task => task.id === id);
    if(!found){
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return found;
  }

  getTaskByFilter(filterDto: GetTaskFilterDto): Task[] {
    const {status, search} = filterDto;

    let tasks = this.getAllTasks();

    if(status){
      tasks = tasks.filter(t => t.status === status);
    }

    if(search){
      tasks = tasks.filter(t => {
        t.title.includes(search) ||
        t.description.includes(search)
      }, )
    }

    return tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  deleteTaskById(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter(t => t.id !== found.id);
  }

  updateStatus(id: string, status: TaskStatus): Task{
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
