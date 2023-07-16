import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Columns } from "./column.entity";
import { Subtask } from "./subtask.entity";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string
    
    @Column()
    description: string

    @Column()
    color: string

    @ManyToOne(() => Columns, column => column.tasks)
    column: Columns

    @OneToMany(() => Subtask, subtask => subtask.task, {eager: true, cascade: true})
    subtasks: Subtask[]
}