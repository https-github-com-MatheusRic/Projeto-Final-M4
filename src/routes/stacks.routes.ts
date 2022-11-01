import { Router } from "express"

const routes = Router()

export const stacksRouter = () => {
  routes.post("/")
  routes.get("/")
  routes.get("/:id")
  routes.delete("/:id")

  return routes
}
