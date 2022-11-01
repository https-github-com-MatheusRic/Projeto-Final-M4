import { IBudgetRequest } from "../../interfaces/budgets"
import AppDataSource from "../../data-source"

import { Budget } from "../../entities/budget.entitie"
import { User } from "../../entities/user.entitie"
import { Customer } from "../../entities/customer.entitie"
import { BudgetStack } from "../../entities/budgetStack.entitie"
import { Category } from "../../entities/category.entitie"

const createBudgetService = async ({
  name: projectName,
  time: projectTime,
  budget,
  fixedCost,
  variableCost,
  userId,
  customerId,
  stackId,
  categoryId,
}: IBudgetRequest): Promise<Budget> => { 

  const budgetRepository = AppDataSource.getRepository(Budget)

  const userRepository = AppDataSource.getRepository(User)
  const user = await userRepository.findOneBy({uuid: userId})

  const customerRepository = AppDataSource.getRepository(Customer)
  const customer = await customerRepository.findOneBy({uuid: customerId})

  const stackRepository = AppDataSource.getRepository(BudgetStack)
  const budgetStack = await stackRepository.findOneBy({uuid: stackId})

  const categoryRepository = AppDataSource.getRepository(Category)
  const category = await categoryRepository.findOneBy({uuid: categoryId})

  const newBudget = budgetRepository.create({
    projectName,
    projectTime,
    budget,
    fixedCost,
    variableCost,
    user: user!,
    category: category!,
    customer: customer!,
    budgetStack: budgetStack!
  })

  await budgetRepository.save(newBudget)

  return newBudget
}

export default createBudgetService
