"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const board_entity_1 = require("./entities/board.entity");
const column_entity_1 = require("./entities/column.entity");
const task_entity_1 = require("./entities/task.entity");
const subtask_entity_1 = require("./entities/subtask.entity");
const boards_service_1 = require("./boards.service");
const column_service_1 = require("./column.service");
const task_service_1 = require("./task.service");
const boards_controller_1 = require("./boards.controller");
const auth_module_1 = require("../auth/auth.module");
const user_entity_1 = require("../auth/users/entities/user.entity");
const column_controller_1 = require("./column.controller");
const task_controller_1 = require("./task.controller");
let BoardsModule = exports.BoardsModule = class BoardsModule {
};
exports.BoardsModule = BoardsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.User,
                board_entity_1.Board,
                column_entity_1.Columns,
                task_entity_1.Task,
                subtask_entity_1.Subtask
            ]),
            auth_module_1.AuthModule
        ],
        providers: [
            boards_service_1.BoardsService,
            column_service_1.ColumnsService,
            task_service_1.TaskService
        ],
        controllers: [
            boards_controller_1.BoardsController,
            column_controller_1.ColumnsController,
            task_controller_1.TaskController
        ],
        exports: [
            boards_service_1.BoardsService,
            column_service_1.ColumnsService,
            task_service_1.TaskService
        ]
    })
], BoardsModule);
//# sourceMappingURL=boards.module.js.map