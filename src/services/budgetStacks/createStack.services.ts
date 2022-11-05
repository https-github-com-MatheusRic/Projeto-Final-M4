import AppDataSource from "../../data-source"
import AppError from "../../errors/appError"
import { IBudgetStack } from "../../interfaces/budgetsStacks"
import { BudgetStack } from "../../entities/budgetStack.entitie"

const createBudgetStackService = async ({ stack }: IBudgetStack): Promise<BudgetStack> => {
    const budgetStackRepository = AppDataSource.getRepository(BudgetStack)
    const budgetsStackAlreadyExists = await budgetStackRepository.findOneBy({ stack })

    if(budgetsStackAlreadyExists){
        throw new AppError("Category already exists",404)
    }

    const newBudgetStack = budgetStackRepository.create({
        stack
    })

    await budgetStackRepository.save(newBudgetStack)

    return newBudgetStack

}
export default createBudgetStackService