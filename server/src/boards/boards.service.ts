import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/users/entities/user.entity';
import { CreateBoardDto, UpdateBoardDto } from './dto/boards.dto';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoardsService {

    constructor(
        @InjectRepository(Board)
        private readonly boardsRepo: Repository<Board>
    ) {}

    async getAll(user: User) {
        return await this.boardsRepo.find({where: {user: {id: user.id}}})
    }

    async getOne(id: number, user: User) {
        return await this.boardsRepo.findOne({where: {id, user: {id: user.id}}})
    }

    async create(data: CreateBoardDto, user: User) {
        return await this.boardsRepo.save({user, ...data})
    }

    async update(id: number, data: UpdateBoardDto, user: User) {
        return await this.boardsRepo.update(id, {user, ...data})
    }

    async delete(id: number, user: User) {
        return await this.boardsRepo.delete(id)
    }

}