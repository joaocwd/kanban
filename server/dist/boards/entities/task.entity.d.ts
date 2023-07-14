import { Columns } from "./column.entity";
import { Subtask } from "./subtask.entity";
export declare class Task {
    id: number;
    title: string;
    color: string;
    column: Columns;
    subtasks: Subtask[];
}
