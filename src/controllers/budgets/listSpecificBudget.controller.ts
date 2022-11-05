import { Request, Response } from "express"

import listSpecificBudgetService from "../../services/budgets/listSpecificBudget.service"

const listSpecificBudgetController = async (req: Request, res: Response) => {
  const userId = req.user.uuid
  const budgetId = req.params.uuid

  const budget = await listSpecificBudgetService(budgetId, userId)

  return res.json(budget)
}

export default listSpecificBudgetController
