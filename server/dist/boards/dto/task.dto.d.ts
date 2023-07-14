export declare class CreateTaskDto {
    title: string;
    color?: string;
    columnId: number;
}
export declare class CreateSubtaskDto {
    text: string;
    checked?: string;
}
export declare class UpdateTaskDto {
    title?: string;
    color?: string;
    columnId?: number;
}
export declare class UpdateSubtaskDto {
    text?: string;
    checked?: boolean;
}
