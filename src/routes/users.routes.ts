import { Router } from "express"
import createUserControler from "../controllers/users/createUser.controller"
import { listUniqueUserController, listUserController } from "../controllers/users/listUser.controller"
import updateUserController from "../controllers/users/updateUser.controller"
import deleteUserController from "../controllers/users/deleteUser.controller"

import { createUserSerializer } from "../serializers/user.serializer"

import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware"
import validadeSerializerMiddleware from "../middlewares/validateSerializer.middleware"

const routes = Router()

export const usersRouter = () => {

  routes.post(
    "/", 
    validadeSerializerMiddleware(createUserSerializer), 
    createUserControler
  )
  routes.get("/", ensureAuthMiddleware, listUserController)
  routes.get("/:id", ensureAuthMiddleware, listUniqueUserController)
  routes.patch("/:id", ensureAuthMiddleware, updateUserController)
  routes.delete("/:id", ensureAuthMiddleware, deleteUserController)

  return routes
}
