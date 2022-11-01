import { Router } from "express"

const routes = Router()

export const categoriesRouter = () => {
  routes.post("/")
  routes.get("/")
  routes.get("/:id")
  routes.delete("/:id")

  return routes
}
