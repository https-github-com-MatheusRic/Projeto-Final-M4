import { Request, Response } from "express"

import createBudgetService from "../../services/budgets/createBudget.service"

const createBudgetController = async (req: Request, res: Response) => {
  const data = req.body
  const userId = req.user.uuid
  
  const createdBudget = await createBudgetService(userId, data)

  return res.status(201).json(createdBudget)
}

export default createBudgetController