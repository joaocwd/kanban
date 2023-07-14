import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./task.entity";

@Entity()
export class Subtask {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    text: string

    @Column({default: false})
    checked: boolean

    @ManyToOne(() => Task, task => task.subtasks)
    task: Task
}