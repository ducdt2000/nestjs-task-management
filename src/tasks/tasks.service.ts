import { TaskRepository } from './task.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { DeleteResult } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ){}

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    
    if(!found){
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return found;

  }

  async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]>{
    return this.taskRepository.getTasks(filterDto);
  }

  // getTaskByFilter(filterDto: GetTaskFilterDto): Task[] {
  //   const {status, search} = filterDto;

  //   let tasks = this.getAllTasks();

  //   if(status){
  //     tasks = tasks.filter(t => t.status === status);
  //   }

  //   if(search){
  //     tasks = tasks.filter(t => {
  //       t.title.includes(search) ||
  //       t.description.includes(search)
  //     }, )
  //   }

  //   return tasks;
  // }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task>{
    return this.taskRepository.createTask(createTaskDto);
  }

  async deleteTaskById(id: number): Promise<void>{
    const result = await this.taskRepository.delete(id);
    if(result.affected === 0){
      throw new NotFoundException(`Task within ID "${id}" not found`);
    }
  }

  async updateStatus(id: number, status: TaskStatus): Promise<Task>{
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;
  }
}
