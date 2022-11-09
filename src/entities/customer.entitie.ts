import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { usersRouter } from "../routes/users.routes"
import { Budget } from './budget.entitie'
import { User } from "./user.entitie"

@Entity("customers")
export class Customer {
    @PrimaryGeneratedColumn("uuid")
    uuid: string

    @Column({ length: 240 })
    name: string

    @Column({ default: false, nullable: true })
    isCompany: boolean

    @Column({ length: 120 })
    email: string

    @Column({ length: 50, nullable: true })
    contact: string

    @OneToMany(() => Budget, budget => budget.customer)
    budgets: Budget[]

    @ManyToOne(() => User, { cascade: true, onDelete: "CASCADE"})
    user: User
}