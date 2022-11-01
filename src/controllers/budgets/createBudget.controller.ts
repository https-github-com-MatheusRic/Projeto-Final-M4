import { Request, Response } from "express"

import createBudgetService from "../../services/budgets/createBudget.service"

const createBudgetController = async (req: Request, res: Response) => {
  const data = req.body
  const createdBudget = await createBudgetService(data)

  return res.status(201).json(createdBudget)
}

export default createBudgetController