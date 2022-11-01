import { Router } from "express"
import createBudgetController from "../controllers/budgets/createBudget.controller"
import deleteBudgetController from "../controllers/budgets/deleteBudget.controller"
import listBudgetsByUserController from "../controllers/budgets/listBudgetsByUser.controller"
import listSpecificBudgetController from "../controllers/budgets/listSpecificBudget.controller"
import updateBudgetController from "../controllers/budgets/updateBudget.controller"

import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware"

const routes = Router()

export const budgetsRouter = () => {
  routes.post("/", createBudgetController)
  routes.get("/", ensureAuthMiddleware, listBudgetsByUserController)
  routes.get("/:id", ensureAuthMiddleware, listSpecificBudgetController)
  routes.patch("/:id", ensureAuthMiddleware, updateBudgetController)
  routes.delete("/:id", ensureAuthMiddleware, deleteBudgetController)

  return routes
}