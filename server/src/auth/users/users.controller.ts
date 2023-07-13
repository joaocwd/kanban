import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuardJwt } from '../auth-guard.jwt';
import { CurrentUser } from './current.user.decoration';
import { CreateUserDto } from './dto/create.user.dto';
import { LoginUserDto } from './dto/login.user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    /*
    ON THAT CONTROLLER:
    -> GET  - user/             - GET CURRENT USER
    -> POST - user/login        - AUTH BY EMAIL AND PASS
    -> POST - user/register     - REGISTER ON PLATFORM
    -> POST - user/forgot       - FORGOT PASSWORD
    */

    constructor(
        private readonly userService: UsersService
    ){}
    
    @Get()
    @UseGuards(AuthGuardJwt)
    async getCurrentUser(@CurrentUser() user: User) {
        console.log(process.env.AUTH_SECRET)
        return await this.userService.getCurrentUser(user)
    }

    @Post()
    async login (@Body() user: LoginUserDto) {
        return await this.userService.login(user)
    }

    @Post('register')
    async register(@Body() createUser: CreateUserDto) {
        console.log(createUser)
        return await this.userService.create(createUser)
    }

    @Post('forgot')
    async forgotPassword(@CurrentUser() user: User) {
        return await this.userService.forgotPassword(user)
    }
}