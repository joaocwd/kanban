import { Repository } from "typeorm";
import { User } from "./users/entities/user.entity";
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    validate(payload: any): Promise<{
        id: number;
        fullName: string;
        email: string;
        password: string;
        boards: import("../boards/entities/board.entity").Board[];
    }>;
}
export {};
