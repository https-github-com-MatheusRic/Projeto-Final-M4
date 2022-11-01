import { Request, Response } from "express"

import listBudgetsByUserService from "../../services/budgets/listBudgetsByUser.service"

const listBudgetsByUserController = async (req: Request, res: Response) => {
  const userId = req.user.id
  const users = await listBudgetsByUserService(userId)

  return res.json(users)
}

export default listBudgetsByUserController
