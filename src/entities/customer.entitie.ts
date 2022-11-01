import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Budget } from './budget.entitie';


@Entity("customers")
export class Customer {
    @PrimaryGeneratedColumn("uuid")
    uuid: string

    @Column({ length: 240 })
    name: string

    @Column({ default: false, nullable: true })
    isCompany: boolean

    @Column({ length: 120, nullable: true })
    email: string

    @Column({ length: 50, nullable: true })
    contact: string

    @OneToMany(() => Budget, budget => budget.customer)
    budgets: Budget[]
}