import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { AuthGuardJwt } from 'src/auth/auth-guard.jwt';
import { CreateBoardDto, UpdateBoardDto } from './dto/boards.dto';
import { CurrentUser } from 'src/auth/users/current.user.decoration';
import { User } from 'src/auth/users/entities/user.entity';

@Controller('boards')
export class BoardsController {
    
    constructor(
        private readonly boardService: BoardsService
    ) {}
    
    @Get()
    @UseGuards(AuthGuardJwt)
    async getAll(@CurrentUser() user: User) {
        return await this.boardService.getAll(user)
    }

    @Get(':id')
    @UseGuards(AuthGuardJwt)
    async getOne(@Param() {id}, @CurrentUser() user: User) {
        return await this.boardService.getOne(id, user)
    }

    @Post()
    @UseGuards(AuthGuardJwt)
    async create(@Body() data: CreateBoardDto, @CurrentUser() user: User) {
        return await this.boardService.create(data, user)
    }

    @Put(':id')
    @UseGuards(AuthGuardJwt)
    async update(@Param() {id}, @Body() data: UpdateBoardDto, @CurrentUser() user: User) {
        return await this.boardService.update(id, data, user)
    }

    @Delete(':id')
    @UseGuards(AuthGuardJwt)
    async delete(@Param() {id}, @CurrentUser() user: User) {
        return await this.boardService.delete(id, user)
    }
}
