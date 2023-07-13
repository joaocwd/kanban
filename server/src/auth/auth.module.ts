import { Module } from "@nestjs/common";
import { User } from "./users/entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { UsersController } from "./users/users.controller";
import { UsersService } from "./users/users.service";
import { AuthService } from "./auth.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.AUTH_SECRET,
                signOptions: {
                expiresIn: '60m'
                }
            })
        }),
    ],
    providers: [JwtStrategy, UsersService, AuthService],
    controllers: [UsersController],
    exports: [UsersService]
})
export class AuthModule {}