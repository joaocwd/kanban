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
exports.TaskController = void 0;
const common_1 = require("@nestjs/common");
const task_service_1 = require("./task.service");
const current_user_decoration_1 = require("../auth/users/current.user.decoration");
const user_entity_1 = require("../auth/users/entities/user.entity");
const auth_guard_jwt_1 = require("../auth/auth-guard.jwt");
const task_dto_1 = require("./dto/task.dto");
let TaskController = exports.TaskController = class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }
    async getOneTask({ taskId }, user) {
        return await this.taskService.getOneTask(taskId, user);
    }
    async getAllTasks({ columnId }, user) {
        return await this.taskService.getAllTasks(columnId, user);
    }
    async getAllSubtasks({ columnId, taskId }, user) {
        return await this.taskService.getAllSubtasks(columnId, taskId, user);
    }
    async createTask(data, user) {
        return await this.taskService.createTask(data, user);
    }
    async createSubtask({ taskId }, data, user) {
        return await this.taskService.createSubtask(taskId, data, user);
    }
    async updateTask({ taskId }, data, user) {
        return await this.taskService.updateTask(taskId, data, user);
    }
    async updateSubtask({ taskId, id }, data, user) {
        return await this.taskService.updateSubtask(id, taskId, data, user);
    }
    async deleteTask({ id }, user) {
        return await this.taskService.deleteTask(id, user);
    }
    async deleteSubtask({ taskId, id }, user) {
        return await this.taskService.deleteSubtask(taskId, id, user);
    }
};
__decorate([
    (0, common_1.Get)('get/:taskId'),
    (0, common_1.UseGuards)(auth_guard_jwt_1.AuthGuardJwt),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, current_user_decoration_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "getOneTask", null);
__decorate([
    (0, common_1.Get)(':columnId'),
    (0, common_1.UseGuards)(auth_guard_jwt_1.AuthGuardJwt),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, current_user_decoration_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "getAllTasks", null);
__decorate([
    (0, common_1.Get)(':columnId/:taskId'),
    (0, common_1.UseGuards)(auth_guard_jwt_1.AuthGuardJwt),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, current_user_decoration_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "getAllSubtasks", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_jwt_1.AuthGuardJwt),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decoration_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_dto_1.CreateTaskDto, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "createTask", null);
__decorate([
    (0, common_1.Post)(':taskId'),
    (0, common_1.UseGuards)(auth_guard_jwt_1.AuthGuardJwt),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decoration_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, task_dto_1.CreateSubtaskDto, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "createSubtask", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(auth_guard_jwt_1.AuthGuardJwt),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decoration_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, task_dto_1.UpdateTaskDto, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "updateTask", null);
__decorate([
    (0, common_1.Put)(':taskId/:id'),
    (0, common_1.UseGuards)(auth_guard_jwt_1.AuthGuardJwt),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decoration_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, task_dto_1.UpdateSubtaskDto, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "updateSubtask", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(auth_guard_jwt_1.AuthGuardJwt),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, current_user_decoration_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "deleteTask", null);
__decorate([
    (0, common_1.Delete)(':taskId/:id'),
    (0, common_1.UseGuards)(auth_guard_jwt_1.AuthGuardJwt),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, current_user_decoration_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "deleteSubtask", null);
exports.TaskController = TaskController = __decorate([
    (0, common_1.Controller)('task'),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TaskController);
//# sourceMappingURL=task.controller.js.map