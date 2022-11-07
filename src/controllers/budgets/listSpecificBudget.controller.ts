import { Request, Response } from "express"

import listSpecificBudgetService from "../../services/budgets/listSpecificBudget.service"

const listSpecificBudgetController = async (req: Request, res: Response) => {
  const userId = req.user.uuid
  const budgetId = req.params.uuid

  const budget = await listSpecificBudgetService(budgetId, userId)

  const response = {...budget,
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

  return res.json(response)
}

export default listSpecificBudgetController
