export class CreateTaskDto {
    title: string
    description?: string
    color?: string
    columnId: number
}

export class CreateSubtaskDto {
    text: string
    checked?: string
}

export class UpdateTaskDto {
    title?: string
    description?: string
    color?: string
    columnId?: number
}

export class UpdateSubtaskDto {
    text?: string
    checked?: boolean
}