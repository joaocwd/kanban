import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { TaskService } from "./task.service";
import { CurrentUser } from "src/auth/users/current.user.decoration";
import { User } from "src/auth/users/entities/user.entity";
import { AuthGuardJwt } from "src/auth/auth-guard.jwt";
import { CreateSubtaskDto, CreateTaskDto, UpdateSubtaskDto, UpdateTaskDto } from "./dto/task.dto";

@Controller('task')
export class TaskController {
    constructor(
        private readonly taskService: TaskService
    ) {}

    @Get(':columnId')
    @UseGuards(AuthGuardJwt)
    async getAllTasks(@Param() {columnId}, @CurrentUser() user: User) {
        return await this.taskService.getAllTasks(columnId, user)
    }

    @Get(':columnId/:taskId')
    @UseGuards(AuthGuardJwt)
    async getAllSubtasks(@Param() {columnId, taskId}, @CurrentUser() user: User) {
        return await this.taskService.getAllSubtasks(columnId, taskId, user)
    }

    @Post()
    @UseGuards(AuthGuardJwt)
    async createTask(@Body() data: CreateTaskDto, @CurrentUser() user: User) {
        return await this.taskService.createTask(data, user)
    }

    @Post(':taskId')
    @UseGuards(AuthGuardJwt)
    async createSubtask(@Param() {taskId}, @Body() data: CreateSubtaskDto, @CurrentUser() user: User) {
        return await this.taskService.createSubtask(taskId, data, user)
    }

    @Put(':id')
    @UseGuards(AuthGuardJwt)
    async updateTask(@Param() {taskId}, @Body() data: UpdateTaskDto, @CurrentUser() user: User) {
        return await this.taskService.updateTask(taskId, data, user)
    }

    @Put(':taskId/:id')
    @UseGuards(AuthGuardJwt)
    async updateSubtask(@Param() {taskId, id}, @Body() data: UpdateSubtaskDto, @CurrentUser() user: User) {
        return await this.taskService.updateSubtask(id, taskId, data, user)
    }

    @Delete(':id')
    @UseGuards(AuthGuardJwt)
    async deleteTask(@Param() {id}, @CurrentUser() user: User) {
        return await this.taskService.deleteTask(id, user)
    }

    @Delete(':taskId/:id')
    @UseGuards(AuthGuardJwt)
    async deleteSubtask(@Param() {taskId, id}, @CurrentUser() user: User) {
        return await this.taskService.deleteSubtask(taskId, id, user)
    }
    
}