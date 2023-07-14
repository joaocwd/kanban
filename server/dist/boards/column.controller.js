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
exports.ColumnsController = void 0;
const common_1 = require("@nestjs/common");
const column_service_1 = require("./column.service");
const auth_guard_jwt_1 = require("../auth/auth-guard.jwt");
const current_user_decoration_1 = require("../auth/users/current.user.decoration");
const user_entity_1 = require("../auth/users/entities/user.entity");
const column_dto_1 = require("./dto/column.dto");
let ColumnsController = exports.ColumnsController = class ColumnsController {
    constructor(columnService) {
        this.columnService = columnService;
    }
    async getAll({ boardId }, user) {
        return await this.columnService.getAll(boardId, user);
    }
    async getOne({ boardId, id }, user) {
        return await this.columnService.getOne(boardId, id, user);
    }
    async create({ boardId }, data, user) {
        return await this.columnService.create(boardId, data, user);
    }
    async update({ boardId, id }, data, user) {
        return await this.columnService.update(boardId, id, data, user);
    }
    async delete({ boardId, id }, user) {
        return await this.columnService.delete(boardId, id, user);
    }
};
__decorate([
    (0, common_1.Get)(':boardId'),
    (0, common_1.UseGuards)(auth_guard_jwt_1.AuthGuardJwt),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, current_user_decoration_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], ColumnsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':boardId/:id'),
    (0, common_1.UseGuards)(auth_guard_jwt_1.AuthGuardJwt),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, current_user_decoration_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], ColumnsController.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)(':boardId'),
    (0, common_1.UseGuards)(auth_guard_jwt_1.AuthGuardJwt),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decoration_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, column_dto_1.CreateColumnsDto, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], ColumnsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':boardId/:id'),
    (0, common_1.UseGuards)(auth_guard_jwt_1.AuthGuardJwt),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decoration_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, column_dto_1.UpdateColumnsDto, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], ColumnsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':boardId/:id'),
    (0, common_1.UseGuards)(auth_guard_jwt_1.AuthGuardJwt),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, current_user_decoration_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], ColumnsController.prototype, "delete", null);
exports.ColumnsController = ColumnsController = __decorate([
    (0, common_1.Controller)('column'),
    __metadata("design:paramtypes", [column_service_1.ColumnsService])
], ColumnsController);
//# sourceMappingURL=column.controller.js.map