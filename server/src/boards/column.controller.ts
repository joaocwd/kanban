import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ColumnsService } from "./column.service";
import { AuthGuardJwt } from "src/auth/auth-guard.jwt";
import { CurrentUser } from "src/auth/users/current.user.decoration";
import { User } from "src/auth/users/entities/user.entity";
import { CreateColumnsDto, UpdateColumnsDto } from "./dto/column.dto";

@Controller('column')
export class ColumnsController {
    constructor(
        private readonly columnService: ColumnsService
    ) {}

    @Get(':boardId')
    @UseGuards(AuthGuardJwt)
    async getAll(@Param() {boardId}, @CurrentUser() user: User) {
        return await this.columnService.getAll(boardId, user)
    }

    @Get(':boardId/:id')
    @UseGuards(AuthGuardJwt)
    async getOne(@Param() {boardId, id}, @CurrentUser() user: User) {
        return await this.columnService.getOne(boardId, id, user)
    }

    @Post(':boardId')
    @UseGuards(AuthGuardJwt)
    async create(@Param() {boardId}, @Body() data: CreateColumnsDto, @CurrentUser() user: User) {
        return await this.columnService.create(boardId, data, user)
    }

    @Put(':boardId/:id')
    @UseGuards(AuthGuardJwt)
    async update(@Param() {boardId, id}, @Body() data: UpdateColumnsDto, @CurrentUser() user: User) {
        return await this.columnService.update(boardId, id, data, user)
    }

    @Delete(':boardId/:id')
    @UseGuards(AuthGuardJwt)
    async delete(@Param() {boardId, id}, @CurrentUser() user: User) {
        return await this.columnService.delete(boardId, id, user)
    }
}