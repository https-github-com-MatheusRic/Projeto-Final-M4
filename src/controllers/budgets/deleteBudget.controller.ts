import { Request, Response } from "express"

import deleteBudgetService from "../../services/budgets/deleteBudget.service"

const deleteBudgetController = async (req: Request, res: Response) => {
  const userId = req.user.id
  const budgetId = req.params.id

  await deleteBudgetService(budgetId, userId)

  return res.status(204).json({
    message: "Budget deleted!",
  })
}

export default deleteBudgetController
