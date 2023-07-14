import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Columns } from './entities/column.entity';
import { Task } from './entities/task.entity';
import { Subtask } from './entities/subtask.entity';
import { BoardsService } from './boards.service';
import { ColumnsService } from './column.service';
import { TaskService } from './task.service';
import { BoardsController } from './boards.controller';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/auth/users/entities/user.entity';
import { ColumnsController } from './column.controller';
import { TaskController } from './task.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User,
            Board,
            Columns,
            Task,
            Subtask
        ]),
        AuthModule
    ],
    providers: [
        BoardsService,
        ColumnsService,
        TaskService
    ],
    controllers: [
        BoardsController,
        ColumnsController,
        TaskController
    ],
    exports: [
        BoardsService,
        ColumnsService,
        TaskService
    ]
})
export class BoardsModule {}
