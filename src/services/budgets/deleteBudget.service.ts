import AppDataSource from "../../data-source"
import AppError from "../../errors/appError"
import { Budget } from "../../entities/budget.entitie"

const deleteBudgetService = async (budgetId: string, userId: string) => {
  const budgetRepository = AppDataSource.getRepository(Budget)

  const budget = await budgetRepository.findOneBy({ uuid: budgetId })
  
  if (!budget) {
    throw new AppError("Budget not found", 404)
  }

  else if (userId !== budget.user.uuid) {
    throw new AppError("Unauthorized access", 401)
  } 

  await budgetRepository.delete(budgetId)

  return 
}

export default deleteBudgetService