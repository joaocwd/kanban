import { BoardsService } from './boards.service';
import { CreateBoardDto, UpdateBoardDto } from './dto/boards.dto';
import { User } from 'src/auth/users/entities/user.entity';
export declare class BoardsController {
    private readonly boardService;
    constructor(boardService: BoardsService);
    getAll(user: User): Promise<import("./entities/board.entity").Board[]>;
    getOne({ id }: {
        id: any;
    }, user: User): Promise<import("./entities/board.entity").Board>;
    create(data: CreateBoardDto, user: User): Promise<{
        name: string;
        user: User;
    } & import("./entities/board.entity").Board>;
    update({ id }: {
        id: any;
    }, data: UpdateBoardDto, user: User): Promise<import("typeorm").UpdateResult>;
    delete({ id }: {
        id: any;
    }, user: User): Promise<import("typeorm").DeleteResult>;
}
