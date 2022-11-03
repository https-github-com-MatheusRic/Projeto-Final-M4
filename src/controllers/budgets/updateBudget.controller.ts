import { Request, Response } from "express"

import updateBudgetService from "../../services/budgets/updateBudget.service"

const updateBudgetController = async (req: Request, res: Response) => {
  const data = req.body
  const userId = req.user.uuid
  const budgetId = req.params.uuid

  const updatedBudget = await updateBudgetService(data, budgetId, userId)

  return res.status(201).json(updatedBudget)
}

export default updateBudgetController