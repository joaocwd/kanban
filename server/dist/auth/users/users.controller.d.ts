import { CreateUserDto } from './dto/create.user.dto';
import { LoginUserDto } from './dto/login.user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    getCurrentUser(user: User): Promise<{
        id: number;
        email: string;
        fullName: string;
        boards: import("../../boards/entities/board.entity").Board[];
    }>;
    login(user: LoginUserDto): Promise<{
        id: number;
        token: string;
    }>;
    register(createUser: CreateUserDto): Promise<{
        id: number;
        token: string;
    }>;
    forgotPassword(user: User): Promise<void>;
}
