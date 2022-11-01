import { Router } from "express"
import createUserControler from "../controllers/users/createUser.controller"
import { listUniqueUserController, listUserController } from "../controllers/users/listUser.controller"
import updateUserController from "../controllers/users/updateUser.controller"

import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware"

const routes = Router()

export const usersRouter = () => {
  routes.post("/", createUserControler)
  routes.get("/", ensureAuthMiddleware, listUserController)
  routes.get("/:id", ensureAuthMiddleware, listUniqueUserController)
  routes.patch("/:id", ensureAuthMiddleware, updateUserController)
  routes.delete("/:id", ensureAuthMiddleware)

  return routes
}
