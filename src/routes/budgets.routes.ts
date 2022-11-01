import { Router } from "express"

import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware"

const routes = Router()

export const budgetsRouter = () => {
  routes.post("/")
  routes.get("/", ensureAuthMiddleware)
  routes.get("/:id", ensureAuthMiddleware)
  routes.patch("/:id", ensureAuthMiddleware)
  routes.delete("/:id", ensureAuthMiddleware)

  return routes
}