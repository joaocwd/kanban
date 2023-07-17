import { Columns } from "./column.entity";
import { User } from "src/auth/users/entities/user.entity";
export declare class Board {
    id: number;
    name: string;
    columns: Columns[];
    user: User;
}
