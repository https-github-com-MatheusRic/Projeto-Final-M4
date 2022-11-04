import { Request, Response } from "express"
import createBudgetStackService from "../../services/budgetStacks/createStack.services"

const createBudgetStackController = async (req: Request , res: Response) => {
   const data = req.body
   const newBudgetStackCreated = await createBudgetStackService(data)

   return res.status(201).json(newBudgetStackCreated)
}
export default createBudgetStackController