import { Repository } from 'typeorm';
import { AuthService } from '../auth.service';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login.user.dto';
import { CreateUserDto } from './dto/create.user.dto';
export declare class UsersService {
    private readonly authService;
    private readonly usersRepository;
    constructor(authService: AuthService, usersRepository: Repository<User>);
    getCurrentUser(currentUser: any): Promise<{
        id: number;
        email: string;
        fullName: string;
    }>;
    getAllUserInfo(currentUser: any): Promise<User>;
    login(body: LoginUserDto): Promise<{
        id: number;
        token: string;
    }>;
    create(newUser: CreateUserDto): Promise<{
        id: number;
        token: string;
    }>;
    forgotPassword(user: any): Promise<void>;
}
