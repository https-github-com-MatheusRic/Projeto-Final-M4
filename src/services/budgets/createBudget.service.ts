import { IBudgetRequest } from "../../interfaces/budgets"
//Importar entity
import AppDataSource from "../../data-source"

const createBudgetService = async ({
  name,
  time,
  budget,
  fixedCost,
  variableCost,
  userId,
  customerId,
  stackId,
  categoryId,
}: IBudgetRequest): Promise<Budget> => { //Importar entity
  const budgetRepository = AppDataSource.getRepository(Budget)

  const newBudget = budgetRepository.create({
    name,
    time,
    budget,
    fixedCost,
    variableCost,
    userId,
    customerId,
    stackId,
    categoryId,
  })

  await budgetRepository.save(newBudget)

  return newBudget
}

export default createBudgetService
