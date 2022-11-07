import { Request, Response } from "express"

import listBudgetsByUserService from "../../services/budgets/listBudgetsByUser.service"

const listBudgetsByUserController = async (req: Request, res: Response) => {
  const userId = req.user.uuid
  const budgets = await listBudgetsByUserService(userId)

  const response = budgets.map((budget) => {
    const newBudget = {...budget,
      user: {
        uuid: budget.user.uuid,
        name: budget.user.name,
      },
      category: {
        uuid: budget.category.uuid,
        name: budget.category.name,
      },
      customer: {
        uuid: budget.customer.uuid,
        name: budget.customer.name,
      },
      stack: {
        uuid: budget.budgetStack.uuid,
        name: budget.budgetStack.stack,
      },
    }
    return newBudget
  })
  return res.json(response)
}

export default listBudgetsByUserController
