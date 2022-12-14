import AppDataSource from "../../data-source"
import AppError from "../../errors/appError"

import { Budget } from "../../entities/budget.entitie"

const listSpecificBudgetService = async (
  budgetId: string,
  userId: string
): Promise<Budget> => {
  const budgetRepository = AppDataSource.getRepository(Budget)

  const budget = await budgetRepository.findOne({
    where: {
      uuid: budgetId,
    },
    relations: {
      user: true,
      category: true,
      budgetStack: true,
      customer: true
    },
  })

  if (!budget) {
    throw new AppError("Budget not found", 404)
  } else if (userId !== budget.user.uuid) {
    throw new AppError("Unauthorized access", 401)
  }

  return budget
}

export default listSpecificBudgetService
