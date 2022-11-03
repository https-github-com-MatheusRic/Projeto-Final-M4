import AppDataSource from "../../data-source"
import AppError from "../../errors/appError"
import { Budget } from "../../entities/budget.entitie"
import { IBudgetUpdate } from "../../interfaces/budgets"

const updateBudgetService = async (
  data: IBudgetUpdate,
  budgetId: string,
  userId: string
): Promise<Budget> => {
  const dataKeys = Object.keys(data)

  if (dataKeys.length === 0) {
    throw new AppError("No fields to edit.")
  }

  dataKeys.forEach((key) => {
    if (
      key !== "projectName" &&
      key !== "projectTime" &&
      key !== "budget" &&
      key !== "fixedCost" &&
      key !== "variableCost"
    ) {
      throw new AppError(
        "Accepted fields only: projectName, projectTime, budget, fixedCost and variableCost"
      )
    }
  })

  const budgetRepository = AppDataSource.getRepository(Budget)

  const budget = await budgetRepository.findOne({
    where: {
      uuid: budgetId,
    },
  })

  if (!budget) {
    throw new AppError("Budget not found", 404)
  } else if (userId !== budget.user.uuid) {
    throw new AppError("Unauthorized access", 401)
  }

  await budgetRepository.update(budgetId, {
    ...budget,
    ...data,
  })

  const updatedBudget = await budgetRepository.findOne({
    where: {
      uuid: budgetId,
    },
  })

  return updatedBudget!
}

export default updateBudgetService
