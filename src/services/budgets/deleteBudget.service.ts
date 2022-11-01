//importar entity Budget
import AppDataSource from "../../data-source"
import AppError from "../../errors/appError"


const deleteBudgetService = async (budgetId: string, userId: string) => {
  const budgetRepository = AppDataSource.getRepository(Budget)

  const budget = await budgetRepository.findOneBy({ id: budgetId })
  
  if (!budget) {
    throw new AppError("Budget not found", 404)
  }

  else if (userId !== budget.userId) {
    throw new AppError("Unauthorized access", 401)
  } 

  await budgetRepository.delete(budgetId)

  return 
}

export default deleteBudgetService