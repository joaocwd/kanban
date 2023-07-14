import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/users/entities/user.entity';
import { BoardsModule } from './boards/boards.module';
import { Board } from './boards/entities/board.entity';
import { Columns } from './boards/entities/column.entity';
import { Subtask } from './boards/entities/subtask.entity';
import { Task } from './boards/entities/task.entity';

const entities = [
  User,
  Board,
  Columns,
  Task,
  Subtask
]

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'project',
      entities,
      synchronize: true,
    }),
    BoardsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
