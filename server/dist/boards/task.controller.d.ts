import { TaskService } from "./task.service";
import { User } from "src/auth/users/entities/user.entity";
import { CreateSubtaskDto, CreateTaskDto, UpdateSubtaskDto, UpdateTaskDto } from "./dto/task.dto";
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    getOneTask({ taskId }: {
        taskId: any;
    }, user: User): Promise<import("./entities/task.entity").Task>;
    getAllTasks({ columnId }: {
        columnId: any;
    }, user: User): Promise<import("./entities/task.entity").Task[]>;
    getAllSubtasks({ columnId, taskId }: {
        columnId: any;
        taskId: any;
    }, user: User): Promise<import("./entities/subtask.entity").Subtask[]>;
    createTask(data: CreateTaskDto, user: User): Promise<import("./entities/column.entity").Columns[]>;
    createSubtask({ taskId }: {
        taskId: any;
    }, data: CreateSubtaskDto, user: User): Promise<import("./entities/subtask.entity").Subtask[]>;
    updateTask({ taskId }: {
        taskId: any;
    }, data: UpdateTaskDto, user: User): Promise<import("./entities/task.entity").Task>;
    updateSubtask({ taskId, id }: {
        taskId: any;
        id: any;
    }, data: UpdateSubtaskDto, user: User): Promise<import("./entities/task.entity").Task>;
    deleteTask({ id }: {
        id: any;
    }, user: User): Promise<import("./entities/column.entity").Columns>;
    deleteSubtask({ taskId, id }: {
        taskId: any;
        id: any;
    }, user: User): Promise<import("./entities/task.entity").Task>;
}
