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
exports.ColumnsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const column_entity_1 = require("./entities/column.entity");
const typeorm_2 = require("typeorm");
let ColumnsService = exports.ColumnsService = class ColumnsService {
    constructor(repo) {
        this.repo = repo;
    }
    async getAll(boardId, user) {
        return await this.repo.find({ where: { board: { id: boardId, user } } });
    }
    async getOne(boardId, id, user) {
        return await this.repo.findOne({ where: { id, board: { id: boardId, user } } });
    }
    async create(boardId, data, user) {
        await this.repo.save({ board: { id: boardId }, ...data });
        return await this.repo.find({ where: { board: { id: boardId, user } } });
    }
    async update(boardId, id, data, user) {
        const update = await this.repo.update(id, data);
        if (update.affected === 1)
            return await this.repo.find({ where: { board: { id: boardId, user } } });
    }
    async delete(boardId, id, user) {
        if (!user)
            return common_1.UnauthorizedException;
        const del = await this.repo.delete(id);
        if (del.affected === 1)
            return await this.repo.find({ where: { board: { id: boardId, user } } });
    }
};
exports.ColumnsService = ColumnsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(column_entity_1.Columns)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ColumnsService);
//# sourceMappingURL=column.service.js.map