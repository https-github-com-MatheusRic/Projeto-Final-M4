import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { User } from "./user.entitie"
import { Category } from "./category.entitie"
import { Customer } from "./customer.entitie"
import { BudgetStack } from "./budgetStack.entitie"

@Entity("budgets")
export class Budget {
    @PrimaryGeneratedColumn("uuid")
    uuid: string

    @Column({ length: 240 })
    projectName: string

    @Column( "integer" )
    projectTime: number

    @Column( "decimal", {
        precision: 12, scale: 2
    })
    budget: number

    @Column( "decimal", {
        precision: 12, scale: 2
    })
    fixedCost: number

    @Column( "decimal", {
        precision: 12, scale: 2
    })
    variableCost: number

    @ManyToOne(() => User, { cascade: true, onDelete: "CASCADE" })
    user: User

    @ManyToOne(() => Category, { cascade: true, onDelete: "CASCADE" })
    category: Category

    @ManyToOne(() => Customer, { cascade: true, onDelete: "CASCADE" })
    customer: Customer

    @ManyToOne(() => BudgetStack, { cascade: true, onDelete: "CASCADE" })
    budgetStack: BudgetStack
}