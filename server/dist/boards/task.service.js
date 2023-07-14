"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const task_entity_1 = require("./entities/task.entity");
const typeorm_2 = require("typeorm");
const subtask_entity_1 = require("./entities/subtask.entity");
const column_entity_1 = require("./entities/column.entity");
let TaskService = exports.TaskService = class TaskService {
    constructor(taskRepo, subtaskRepo, columnRepo) {
        this.taskRepo = taskRepo;
        this.subtaskRepo = subtaskRepo;
        this.columnRepo = columnRepo;
    }
    async getAllTasks(columnId, user) {
        if (!user)
            throw new common_1.UnauthorizedException;
        return await this.taskRepo.find({ where: { column: { id: columnId } } });
    }
    async getAllSubtasks(columnId, taskId, user) {
        if (!user)
            throw new common_1.UnauthorizedException;
        return await this.subtaskRepo.find({ where: { task: { id: taskId, column: { id: columnId } } } });
    }
    async getOneTask(id, user) {
        if (!user)
            throw new common_1.UnauthorizedException;
        return await this.taskRepo.findOne({ where: { id } });
    }
    async getOneSubtask(taskId, id, user) {
        if (!user)
            throw new common_1.UnauthorizedException;
        return await this.subtaskRepo.findOne({ where: { id, task: { id: taskId } } });
    }
    async createTask(data, user) {
        if (!user)
            throw new common_1.UnauthorizedException;
        const { columnId, title, color } = data;
        await this.taskRepo.save({ title, color, column: { id: columnId } });
        return await this.taskRepo.find({ where: { column: { id: data.columnId } } });
    }
    async createSubtask(taskId, data, user) {
        if (!user)
            throw new common_1.UnauthorizedException;
        const { text } = data;
        await this.subtaskRepo.save({ task: { id: taskId }, text });
        return await this.subtaskRepo.find({ where: { task: { id: taskId } } });
    }
    async updateTask(id, data, user) {
        if (!user)
            throw new common_1.UnauthorizedException;
        await this.taskRepo.update(id, data);
        return await this.taskRepo.findOne({ where: { id } });
    }
    async updateSubtask(id, taskId, data, user) {
        if (!user)
            throw new common_1.UnauthorizedException;
        await this.subtaskRepo.update(id, data);
        return await this.taskRepo.findOne({ where: { id: taskId } });
    }
    async deleteTask(id, user) {
        if (!user)
            throw new common_1.UnauthorizedException;
        const task = await this.taskRepo.findOne({ where: { id }, relations: ['column'] });
        console.log(task);
        const subtasks = await this.getAllSubtasks(task.column.id, task.id, user);
        for (let i = 0; i < subtasks.length; i++) {
            const st = subtasks[i];
            await this.subtaskRepo.delete(st.id);
        }
        await this.taskRepo.delete(id);
        return await this.columnRepo.findOne({ where: { id: task.column.id } });
    }
    async deleteSubtask(taskId, id, user) {
        if (!user)
            throw new common_1.UnauthorizedException;
        const sub = await this.subtaskRepo.findOne({ where: { id } });
        await this.subtaskRepo.delete(id);
        return await this.taskRepo.findOne({ where: { id: taskId } });
    }
};
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __param(1, (0, typeorm_1.InjectRepository)(subtask_entity_1.Subtask)),
    __param(2, (0, typeorm_1.InjectRepository)(column_entity_1.Columns)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], TaskService);
//# sourceMappingURL=task.service.js.map