import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Budget } from "./budget.entitie"

@Entity("categories")
export class Category {
    @PrimaryGeneratedColumn("uuid")
    uuid: string

    @Column({ length: 50 })
    name: string

    @OneToMany(() => Budget, budget => budget.category)
    budgets: Budget[]
}