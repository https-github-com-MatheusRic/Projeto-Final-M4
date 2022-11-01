import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Budget } from "./budget.entitie"

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    uuid: string

    @Column({ length: 120 })
    email: string

    @Column({ length: 240 })
    password: string

    @Column({ length: 200 })
    name: string

    @Column({ length: 200 })
    username: string

    @Column({ length: 100 })
    position: string

    @Column({ nullable: true })
    imageUrl: string

    @OneToMany(() => Budget, budget => budget.user)
    budgets: Budget[]
}
