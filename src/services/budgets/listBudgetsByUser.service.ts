import AppDataSource from "../../data-source"

import { Budget } from "../../entities/budget.entitie"

const listBudgetsByUserService = async (userId: string): Promise<Budget[]> => {
  const budgetRepository = AppDataSource.getRepository(Budget)

  const budgets = await budgetRepository.find({
    relations: {
      user: true,
      category: true,
      budgetStack: true,
      customer: true,
    },
  })
  
  const res = budgets.filter(budget => budget.user.uuid === userId)
  
  return res
}

export default listBudgetsByUserService
