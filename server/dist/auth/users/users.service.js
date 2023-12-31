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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const auth_service_1 = require("../auth.service");
const crypto_js_1 = require("crypto-js");
const user_entity_1 = require("./entities/user.entity");
const current_user_decoration_1 = require("./current.user.decoration");
let UsersService = exports.UsersService = class UsersService {
    constructor(authService, usersRepository) {
        this.authService = authService;
        this.usersRepository = usersRepository;
    }
    async getCurrentUser(currentUser) {
        const user = await this.usersRepository.findOne({ where: { id: currentUser.id } });
        return {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            boards: user.boards
        };
    }
    async getAllUserInfo(currentUser) {
        const user = await this.usersRepository.findOne({ where: { id: currentUser.id } });
        return user;
    }
    async login(body) {
        console.log(body);
        const user = await this.usersRepository.findOne({ where: { email: body.email } });
        if (user) {
            if ((0, crypto_js_1.SHA256)(body.password).toString() === user.password) {
                const token = this.authService.getTokenForUser(user);
                const response = {
                    id: user.id,
                    token
                };
                return response;
            }
            else {
                throw new common_1.UnauthorizedException();
            }
        }
        else {
            throw new common_1.UnauthorizedException();
        }
    }
    async create(newUser) {
        newUser.password = (0, crypto_js_1.SHA256)(newUser.password).toString();
        const user = await this.usersRepository.save(newUser);
        const token = this.authService.getTokenForUser(user);
        const response = {
            id: user.id,
            token
        };
        return response;
    }
    async forgotPassword(user) {
    }
};
__decorate([
    __param(0, (0, current_user_decoration_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersService.prototype, "getCurrentUser", null);
__decorate([
    __param(0, (0, current_user_decoration_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersService.prototype, "getAllUserInfo", null);
__decorate([
    __param(0, (0, current_user_decoration_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersService.prototype, "forgotPassword", null);
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map