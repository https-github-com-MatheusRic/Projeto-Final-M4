import { Router } from "express"
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware"
import validadeSerializerMiddleware from "../middlewares/validateSerializer.middleware"
import createBudgetController from "../controllers/budgets/createBudget.controller"
import deleteBudgetController from "../controllers/budgets/deleteBudget.controller"
import listBudgetsByUserController from "../controllers/budgets/listBudgetsByUser.controller"
import listSpecificBudgetController from "../controllers/budgets/listSpecificBudget.controller"
import updateBudgetController from "../controllers/budgets/updateBudget.controller"
import { createBudgetSerializer } from "../serializers/budget.serializer"

const routes = Router()

export const budgetsRouter = () => {
  routes.post("/",ensureAuthMiddleware, validadeSerializerMiddleware(createBudgetSerializer), createBudgetController)
  routes.get("/", ensureAuthMiddleware, listBudgetsByUserController)
  routes.get("/:uuid", ensureAuthMiddleware, listSpecificBudgetController)
  routes.patch("/:uuid", ensureAuthMiddleware, updateBudgetController)
  routes.delete("/:uuid", ensureAuthMiddleware, deleteBudgetController)

  return routes
}
