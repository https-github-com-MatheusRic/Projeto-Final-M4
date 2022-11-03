import AppDataSource from "../../data-source"
import AppError from "../../errors/appError"
import { Budget } from "../../entities/budget.entitie"
import { IBudgetUpdate } from "../../interfaces/budgets"

const updateBudgetService = async (
  { ...data }: IBudgetUpdate,
  budgetId: string,
  userId: string
): Promise<Budget> => {
  const budgetRepository = AppDataSource.getRepository(Budget)

  const budget = await budgetRepository.findOne({
    where: {
      uuid: budgetId,
    },
  })

  if (!budget) {
    throw new AppError("Budget not found.", 404)
  } else if (userId !== budget.user.uuid) {
    throw new AppError("Unauthorized access.", 401)
  } else if (
    Object.keys(data).includes("id") ||
    Object.keys(data).includes("userId") ||
    Object.keys(data).includes("customerId") ||
    Object.keys(data).includes("stackId") ||
    Object.keys(data).includes("categoryId")
  ) {
    throw new AppError(
      "You cant change these budget's attributes: id, userId, customerId, stackId or categoryId.",
      401
    )
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
