import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/users/entities/user.entity';
import { Columns } from './entities/column.entity';
import { Repository } from 'typeorm';
import { CreateColumnsDto, UpdateColumnsDto } from './dto/column.dto';
import { Task } from './entities/task.entity';
import { TaskService } from './task.service';

@Injectable()
export class ColumnsService {

    constructor(
        @InjectRepository(Columns)
        private readonly repo: Repository<Columns>,
        @InjectRepository(Task)
        private readonly taskRepo: Repository<Task>,
        private readonly taskService: TaskService
    ) {}

    async getAll(boardId: number, user: User) {
        return await this.repo.find({where: {board: {id: boardId, user}}})
    }

    async getOne(boardId: number, id: number, user: User) {
        return await this.repo.findOne({where: {id, board: {id: boardId, user}}})
    }

    async create(boardId: number, data: CreateColumnsDto, user: User) {
        await this.repo.save({board: {id: boardId}, ...data})
        return await this.repo.find({where: {board: {id: boardId, user}}})
    }

    async update(boardId: number, id: number, data: UpdateColumnsDto, user: User) {
        const update = await this.repo.update(id, data)
        if (update.affected > 0) return await this.repo.find({where: {board: {id: boardId, user}}})
    }

    async delete(boardId: number, id: number, user: User) {
        if (!user) return UnauthorizedException
        const column = await this.repo.findOne({where: {id}})
        for (let i = 0; i < column.tasks.length; i++) {
            const task = column.tasks[i];
            await this.taskService.deleteTask(task.id, user)
        }
        const del = await this.repo.delete(id)
        if (del.affected > 0) return await this.repo.find({where: {board: {id: boardId, user}}})
    }

    async moveTask(boardId: number, taskId: number, newColumnId: number, user: User) {
        const c = await this.repo.findOne({where: {id: newColumnId}})
        const move = await this.taskRepo.update(taskId, {column: c})
        const t = await this.taskRepo.findOne({where: {id: taskId}, relations: ['column']})
        console.log(taskId, newColumnId)
        console.log(t,c)
        console.log(move)
        if (move.affected > 0) return await this.repo.find({where: {board: {id: boardId, user}}})
      }

}
