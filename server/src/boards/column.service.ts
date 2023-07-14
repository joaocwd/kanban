import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/users/entities/user.entity';
import { Columns } from './entities/column.entity';
import { Repository } from 'typeorm';
import { CreateColumnsDto, UpdateColumnsDto } from './dto/column.dto';

@Injectable()
export class ColumnsService {

    constructor(
        @InjectRepository(Columns)
        private readonly repo: Repository<Columns>
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
        if (update.affected === 1) return await this.repo.find({where: {board: {id: boardId, user}}})
    }

    async delete(boardId: number, id: number, user: User) {
        if (!user) return UnauthorizedException
        const del = await this.repo.delete(id)
        if (del.affected === 1) return await this.repo.find({where: {board: {id: boardId, user}}})
    }

}
