import { Request, Response } from "express"

import updateBudgetService from "../../services/budgets/updateBudget.service"

const updateBudgetController = async (req: Request, res: Response) => {
  const data = req.body
  const userId = req.user.uuid
  const budgetId = req.params.uuid

  const updatedBudget = await updateBudgetService(data, budgetId, userId)

  const response = {...updatedBudget,
    user: {
      uuid: updatedBudget.user.uuid,
      name: updatedBudget.user.name,
    },
    category: {
      uuid: updatedBudget.category.uuid,
      name: updatedBudget.category.name,
    },
    customer: {
      uuid: updatedBudget.customer.uuid,
      name: updatedBudget.customer.name,
    },
    stack: {
      uuid: updatedBudget.budgetStack.uuid,
      name: updatedBudget.budgetStack.stack,
    },
  }

  return res.status(201).json(response)
}

export default updateBudgetController
