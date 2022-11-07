import { Request, Response } from "express"

import createBudgetService from "../../services/budgets/createBudget.service"

const createBudgetController = async (req: Request, res: Response) => {
  const data = req.body
  const userId = req.user.uuid

  const createdBudget = await createBudgetService(userId, data)

  const response = {...createdBudget,
    user: {
      uuid: createdBudget.user.uuid,
      name: createdBudget.user.name,
    },
    category: {
      uuid: createdBudget.category.uuid,
      name: createdBudget.category.name,
    },
    customer: {
      uuid: createdBudget.customer.uuid,
      name: createdBudget.customer.name,
    },
    stack: {
      uuid: createdBudget.budgetStack.uuid,
      name: createdBudget.budgetStack.stack,
    },
  }

  return res.status(201).json(response)
}

export default createBudgetController
