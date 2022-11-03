import { Router } from "express"

import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware"
import validadeSerializerMiddleware from "../middlewares/validateSerializer.middleware"

import { createCustomerSerializer } from "../serializers/customer.serializer"

const routes = Router()

export const costumersRouter = () => {
  routes.post(
    "/",
    validadeSerializerMiddleware(createCustomerSerializer)
  )
  routes.get("/", ensureAuthMiddleware)
  routes.get("/:id", ensureAuthMiddleware)
  routes.patch("/:id", ensureAuthMiddleware)
  routes.delete("/:id", ensureAuthMiddleware)

  return routes
}
