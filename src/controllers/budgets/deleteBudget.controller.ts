import { Request, Response } from "express"

import deleteBudgetService from "../../services/budgets/deleteBudget.service"

const deleteBudgetController = async (req: Request, res: Response) => {
  const userId = req.user.uuid
  const budgetId = req.params.uuid

  await deleteBudgetService(budgetId, userId)

  return res.status(204).send()
}

export default deleteBudgetController
