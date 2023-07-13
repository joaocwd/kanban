import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { AuthService } from '../auth.service';
import { SHA256 } from 'crypto-js'
import { User } from './entities/user.entity';
import { CurrentUser } from './current.user.decoration';
import { LoginUserDto } from './dto/login.user.dto';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class UsersService {
    constructor(
        private readonly authService: AuthService,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ){}

    public async getCurrentUser(@CurrentUser() currentUser) {      
        const user = await this.usersRepository.findOne({where: {id: currentUser.id}})
        return {
            id: user.id,
            email: user.email,
            
        }
    }

    public async getAllUserInfo(@CurrentUser() currentUser) {
        const user = await this.usersRepository.findOne({where: {id: currentUser.id}})
        return user
    }

    public async login (body: LoginUserDto) {
        console.log(body)
        const user = await this.usersRepository.findOne({where: {email: body.email}})
        if (user) {
            if (SHA256(body.password).toString() === user.password) {
                const token = this.authService.getTokenForUser(user)
                const response = {
                    id: user.id,
                    token
                }
                return response
            } else {
                throw new UnauthorizedException();
            }
        } else {
            throw new UnauthorizedException();
        }
    }

    public async create(newUser: CreateUserDto) {
        newUser.password = SHA256(newUser.password).toString()
        const user = await this.usersRepository.save(newUser)
        return user
    }

    public async forgotPassword(@CurrentUser() user) {
        // todo: envio de email
    }
}