import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./task.entity";
import { Board } from "./board.entity";

@Entity()
export class Columns {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @OneToMany(() => Task, task => task.column, {eager: true, cascade: true})
    tasks: Task[]

    @ManyToOne(() => Board, board => board.columns)
    board: Board
}