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
exports.BoardsController = void 0;
const common_1 = require("@nestjs/common");
const boards_service_1 = require("./boards.service");
const auth_guard_jwt_1 = require("../auth/auth-guard.jwt");
const boards_dto_1 = require("./dto/boards.dto");
const current_user_decoration_1 = require("../auth/users/current.user.decoration");
const user_entity_1 = require("../auth/users/entities/user.entity");
let BoardsController = exports.BoardsController = class BoardsController {
    constructor(boardService) {
        this.boardService = boardService;
    }
    async getAll(user) {
        return await this.boardService.getAll(user);
    }
    async getOne({ id }, user) {
        return await this.boardService.getOne(id, user);
    }
    async create(data, user) {
        return await this.boardService.create(data, user);
    }
    async update({ id }, data, user) {
        return await this.boardService.update(id, data, user);
    }
    async delete({ id }, user) {
        return await this.boardService.delete(id, user);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(auth_guard_jwt_1.AuthGuardJwt),
    __param(0, (0, current_user_decoration_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(auth_guard_jwt_1.AuthGuardJwt),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, current_user_decoration_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_jwt_1.AuthGuardJwt),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decoration_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [boards_dto_1.CreateBoardDto, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(auth_guard_jwt_1.AuthGuardJwt),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decoration_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, boards_dto_1.UpdateBoardDto, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(auth_guard_jwt_1.AuthGuardJwt),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, current_user_decoration_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "delete", null);
exports.BoardsController = BoardsController = __decorate([
    (0, common_1.Controller)('boards'),
    __metadata("design:paramtypes", [boards_service_1.BoardsService])
], BoardsController);
//# sourceMappingURL=boards.controller.js.map