import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Columns } from "./column.entity";
import { User } from "src/auth/users/entities/user.entity";

@Entity()
export class Board {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Columns, column => column.board, {eager: true, cascade: true})
    columns: Columns[]

    @ManyToOne(() => User)
    user: User
}