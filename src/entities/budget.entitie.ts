import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from './user.entitie';
import { Category } from './category.entitie';
import { Customer } from './customer.entitie';
import { BudgetStack } from './budgetStack.entitie';


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

    @ManyToOne(() => User)
    user: User

    @ManyToOne(() => Category)
    category: Category

    @ManyToOne(() => Customer)
    customer: Customer

    @ManyToOne(() => BudgetStack)
    budgetStack: BudgetStack
}