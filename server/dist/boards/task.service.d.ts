import { User } from 'src/auth/users/entities/user.entity';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { Subtask } from './entities/subtask.entity';
import { CreateSubtaskDto, CreateTaskDto, UpdateSubtaskDto, UpdateTaskDto } from './dto/task.dto';
import { Columns } from './entities/column.entity';
export declare class TaskService {
    private readonly taskRepo;
    private readonly subtaskRepo;
    private readonly columnRepo;
    constructor(taskRepo: Repository<Task>, subtaskRepo: Repository<Subtask>, columnRepo: Repository<Columns>);
    getAllTasks(columnId: number, user: User): Promise<Task[]>;
    getAllSubtasks(columnId: number, taskId: number, user: User): Promise<Subtask[]>;
    getOneTask(id: number, user: User): Promise<Task>;
    getOneSubtask(taskId: number, id: number, user: User): Promise<Subtask>;
    createTask(data: CreateTaskDto, user: User): Promise<Columns[]>;
    createSubtask(taskId: number, data: CreateSubtaskDto, user: User): Promise<Subtask[]>;
    updateTask(id: number, data: UpdateTaskDto, user: User): Promise<Task>;
    updateSubtask(id: number, taskId: number, data: UpdateSubtaskDto, user: User): Promise<Task>;
    deleteTask(id: number, user: User): Promise<Columns>;
    deleteSubtask(taskId: number, id: number, user: User): Promise<Task>;
}
