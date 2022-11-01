//import Budget
import AppDataSource from "../../data-source"

const listBudgetsService = async (): Promise<Budget[]> => {
  const budgetRepository = AppDataSource.getRepository(Budget)

  const budgets = await budgetRepository.find()

  return budgets
}

export default listUsersService
