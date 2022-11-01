import { Router } from "express"
import createUserControler from "../controllers/users/createUser.controller"
import listUserController from "../controllers/users/listUser.controller"

import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware"

const routes = Router()

export const usersRouter = () => {
  routes.post("/", createUserControler)
  routes.get("/", ensureAuthMiddleware, listUserController)
  routes.get("/:id", ensureAuthMiddleware)
  routes.patch("/:id", ensureAuthMiddleware)
  routes.delete("/:id", ensureAuthMiddleware)

  return routes
}
