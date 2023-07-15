import { UnauthorizedException } from '@nestjs/common';
import { User } from 'src/auth/users/entities/user.entity';
import { Columns } from './entities/column.entity';
import { Repository } from 'typeorm';
import { CreateColumnsDto, UpdateColumnsDto } from './dto/column.dto';
import { Task } from './entities/task.entity';
import { TaskService } from './task.service';
export declare class ColumnsService {
    private readonly repo;
    private readonly taskRepo;
    private readonly taskService;
    constructor(repo: Repository<Columns>, taskRepo: Repository<Task>, taskService: TaskService);
    getAll(boardId: number, user: User): Promise<Columns[]>;
    getOne(boardId: number, id: number, user: User): Promise<Columns>;
    create(boardId: number, data: CreateColumnsDto, user: User): Promise<Columns[]>;
    update(boardId: number, id: number, data: UpdateColumnsDto, user: User): Promise<Columns[]>;
    delete(boardId: number, id: number, user: User): Promise<Columns[] | typeof UnauthorizedException>;
    moveTask(boardId: number, taskId: number, newColumnId: number, user: User): Promise<Columns[]>;
}
