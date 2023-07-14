import { Task } from "./task.entity";
import { Board } from "./board.entity";
export declare class Columns {
    id: number;
    title: string;
    tasks: Task[];
    board: Board;
}
