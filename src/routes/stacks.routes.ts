import { Router } from "express"
import createBudgetStackController from "../controllers/budgetsStacks/createStack.controllers"
import deleteStackController from "../controllers/budgetsStacks/deleteStack.controllers"
import listOneStackController from "../controllers/budgetsStacks/listOneStack.controllers"
import listStackController from "../controllers/budgetsStacks/listStacks.controllers"
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware"

import validadeSerializerMiddleware from "../middlewares/validateSerializer.middleware"

import { createBudgetStackSerializer } from "../serializers/budgetStack.serializer"

const routes = Router()

export const stacksRouter = () => {
  routes.post("/",validadeSerializerMiddleware(createBudgetStackSerializer),ensureAuthMiddleware,createBudgetStackController)
  routes.get("/",ensureAuthMiddleware,listStackController)
  routes.get("/:id",ensureAuthMiddleware,listOneStackController )
  routes.delete("/:id",ensureAuthMiddleware,deleteStackController)

  return routes
}
