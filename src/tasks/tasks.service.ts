/* eslint-disable prettier/prettier */
import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find(task => task.id === id);
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

  deleteTaskById(id: string): boolean {
    const indexTask = this.tasks.findIndex(task => task.id === id);
    if(indexTask == -1){
      return false;
    }
    this.tasks.slice(indexTask, 1);
    return true;
  }

  updateStatus(id: string, status: TaskStatus): boolean{
    const task = this.getTaskById(id);
    if(task === undefined){
      return false;
    }
    task.status = status;
    return true;
  }
}
