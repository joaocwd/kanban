import { User } from 'src/auth/users/entities/user.entity';
import { CreateBoardDto, UpdateBoardDto } from './dto/boards.dto';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';
import { ColumnsService } from './column.service';
export declare class BoardsService {
    private readonly boardsRepo;
    private readonly columnService;
    constructor(boardsRepo: Repository<Board>, columnService: ColumnsService);
    getAll(user: User): Promise<Board[]>;
    getOne(id: number, user: User): Promise<Board>;
    create(data: CreateBoardDto, user: User): Promise<{
        name: string;
        user: User;
    } & Board>;
    update(id: number, data: UpdateBoardDto, user: User): Promise<import("typeorm").UpdateResult>;
    delete(id: number, user: User): Promise<import("typeorm").DeleteResult>;
}
