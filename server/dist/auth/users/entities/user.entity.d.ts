import { Board } from 'src/boards/entities/board.entity';
export declare class User {
    id: number;
    fullName: string;
    email: string;
    password: string;
    boards: Board[];
}
