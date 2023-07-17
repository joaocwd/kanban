import { ColumnsService } from "./column.service";
import { User } from "src/auth/users/entities/user.entity";
import { CreateColumnsDto, UpdateColumnsDto } from "./dto/column.dto";
export declare class ColumnsController {
    private readonly columnService;
    constructor(columnService: ColumnsService);
    moveTask({ boardId }: {
        boardId: any;
    }, body: {
        taskId: number;
        newColumnId: number;
    }, user: User): Promise<import("./entities/column.entity").Columns[]>;
    getAll({ boardId }: {
        boardId: any;
    }, user: User): Promise<import("./entities/column.entity").Columns[]>;
    getOne({ boardId, id }: {
        boardId: any;
        id: any;
    }, user: User): Promise<import("./entities/column.entity").Columns>;
    create({ boardId }: {
        boardId: any;
    }, data: CreateColumnsDto, user: User): Promise<import("./entities/column.entity").Columns[]>;
    update({ boardId, id }: {
        boardId: any;
        id: any;
    }, data: UpdateColumnsDto, user: User): Promise<import("./entities/column.entity").Columns[]>;
    delete({ boardId, id }: {
        boardId: any;
        id: any;
    }, user: User): Promise<import("./entities/column.entity").Columns[] | typeof import("@nestjs/common").UnauthorizedException>;
}
