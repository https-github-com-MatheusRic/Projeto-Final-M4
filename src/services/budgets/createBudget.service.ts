import { IBudgetRequest } from "../../interfaces/budgets"
import AppDataSource from "../../data-source"
import AppError from "../../errors/appError"

import { Budget } from "../../entities/budget.entitie"
import { User } from "../../entities/user.entitie"
import { Customer } from "../../entities/customer.entitie"
import { BudgetStack } from "../../entities/budgetStack.entitie"
import { Category } from "../../entities/category.entitie"

const createBudgetService = async (
  userId: string,
  {
    projectName,
    projectTime,
    budget,
    fixedCost,
    variableCost,
    categoryId,
    customerId,
    budgetStackId,
  }: IBudgetRequest
): Promise<Budget> => {
  const userRepository = AppDataSource.getRepository(User)
  const user = await userRepository.findOneBy({ uuid: userId })

  const customerRepository = AppDataSource.getRepository(Customer)
  const customer = await customerRepository.findOneBy({ uuid: customerId })

  if (!customer) {
    throw new AppError("Customer not found", 404)
  }

  const stackRepository = AppDataSource.getRepository(BudgetStack)
  const budgetStack = await stackRepository.findOneBy({ uuid: budgetStackId })

  if (!budgetStack) {
    throw new AppError("Stack not found", 404)
  }

  const categoryRepository = AppDataSource.getRepository(Category)
  const category = await categoryRepository.findOneBy({ uuid: categoryId })

  if (!category) {
    throw new AppError("Category not found", 404)
  }

  const budgetRepository = AppDataSource.getRepository(Budget)
  const newBudget = budgetRepository.create({
    projectName,
    projectTime,
    budget,
    fixedCost,
    variableCost,
    user: user!,
    category,
    customer,
    budgetStack,
  })

  await budgetRepository.save(newBudget)

  return newBudget
}

export default createBudgetService
