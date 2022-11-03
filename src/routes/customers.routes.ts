import { Router } from "express"

import createCustomerController from "../controllers/customers/createCustomer.controller"
import deleteCustomerController from "../controllers/customers/deleteCustomer.controller"
import listCustomersController from "../controllers/customers/listCustomers.controller"
import listOneCustomerController from "../controllers/customers/listOneCustomer.controller"
import updateCustomerController from "../controllers/customers/updateCustomer.controller"
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware"
import validadeSerializerMiddleware from "../middlewares/validateSerializer.middleware"
import { createCustomerSerializer } from "../serializers/customer.serializer"

const routes = Router()

export const costumersRouter = () => {
  routes.post(
    "/", 
    validadeSerializerMiddleware(createCustomerSerializer), 
    createCustomerController
  )
  routes.get("/", ensureAuthMiddleware, listCustomersController)
  routes.get("/:id", ensureAuthMiddleware, listOneCustomerController)
  routes.patch("/:id", ensureAuthMiddleware, updateCustomerController)
  routes.delete("/:id", ensureAuthMiddleware, deleteCustomerController)

  return routes
}
