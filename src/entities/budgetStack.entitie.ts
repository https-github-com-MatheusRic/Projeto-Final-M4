import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Budget } from './budget.entitie';


@Entity("budgetStack") 
export class BudgetStack {
    @PrimaryGeneratedColumn("uuid")
    uuid: string

    @Column({ length: 120, unique: true })
    stack: string

    @OneToMany(() => Budget, budget => budget.budgetStack)
    budgets: Budget[]
}