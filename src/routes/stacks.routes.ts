import { Router } from "express"

import validadeSerializerMiddleware from "../middlewares/validateSerializer.middleware"

import { createBudgetStackSerializer } from "../serializers/budgetStack.serializer"

const routes = Router()

export const stacksRouter = () => {
  routes.post(
    "/",
    validadeSerializerMiddleware(createBudgetStackSerializer),
  )
  routes.get("/")
  routes.get("/:id")
  routes.delete("/:id")

  return routes
}
