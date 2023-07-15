import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/users/entities/user.entity';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { Subtask } from './entities/subtask.entity';
import { CreateSubtaskDto, CreateTaskDto, UpdateSubtaskDto, UpdateTaskDto } from './dto/task.dto';
import { Columns } from './entities/column.entity';

@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(Task)
        private readonly taskRepo: Repository<Task>,
        @InjectRepository(Subtask)
        private readonly subtaskRepo: Repository<Subtask>,
        @InjectRepository(Columns)
        private readonly columnRepo: Repository<Columns>,
    ) {}

    async getAllTasks(columnId: number, user: User) {
        if (!user) throw new UnauthorizedException
        return await this.taskRepo.find({where: {column: {id: columnId}}})
    }
    async getAllSubtasks(columnId: number, taskId: number, user: User) {
        if (!user) throw new UnauthorizedException
        return await this.subtaskRepo.find({where: {task: {id: taskId, column: {id: columnId}}}})
    }

    async getOneTask(id: number, user: User) {
        if (!user) throw new UnauthorizedException
        return await this.taskRepo.findOne({where: {id}})
    }
    async getOneSubtask(taskId: number, id: number, user: User) {
        if (!user) throw new UnauthorizedException
        return await this.subtaskRepo.findOne({where: {id, task: {id: taskId}}})
    }

    async createTask(data: CreateTaskDto, user: User) {
        if (!user) throw new UnauthorizedException
        let {columnId, title, color} = data
        if (!color) color = '#ffffff'
        await this.taskRepo.save({title, color, column: {id: columnId}})
        const column = await this.columnRepo.findOne({where: {id: data.columnId}, relations: ['board']})
        return await this.columnRepo.find({where: {board: {id: column.board.id}}})
    }
    async createSubtask(taskId: number, data: CreateSubtaskDto, user: User) {
        if (!user) throw new UnauthorizedException
        const {text} = data
        await this.subtaskRepo.save({task: {id: taskId}, text})
        return await this.subtaskRepo.find({where: {task: {id: taskId}}})
    }

    async updateTask(id: number, data: UpdateTaskDto, user: User) {
        if (!user) throw new UnauthorizedException
        await this.taskRepo.update(id, data)
        return await this.taskRepo.findOne({where: {id}})
    }
    async updateSubtask(id: number, taskId: number, data: UpdateSubtaskDto, user: User) {
        if (!user) throw new UnauthorizedException
        await this.subtaskRepo.update(id, data)
        return await this.taskRepo.findOne({where: {id: taskId}})
    }

    async deleteTask(id: number, user: User) {
        if (!user) throw new UnauthorizedException
        const task = await this.taskRepo.findOne({where: {id}, relations: ['column']})
        console.log(task)
        const subtasks = await this.getAllSubtasks(task.column.id, task.id, user)
        for (let i = 0; i < subtasks.length; i++) {
            const st = subtasks[i];
            await this.subtaskRepo.delete(st.id)
        }
        await this.taskRepo.delete(id)
        return await this.columnRepo.findOne({where: {id: task.column.id}})
    }
    async deleteSubtask(taskId: number, id: number, user: User) {
        if (!user) throw new UnauthorizedException
        const sub = await this.subtaskRepo.findOne({where: {id}})
        await this.subtaskRepo.delete(id)
        return await this.taskRepo.findOne({where: {id: taskId}})
    }

}
