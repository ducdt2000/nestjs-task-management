import {  BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowStatuses = [
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.OPEN
  ]

  transform(value: any){
    value = value.toUpperCase();

    if(!this.isStatusValid(value)){
      throw new BadRequestException(`"${value}" is an invalid status`);
    }

    return value;
  }

  private isStatusValid(status: any): boolean {
    const index = this.allowStatuses.indexOf(status);
    return index !== -1;
  }
}