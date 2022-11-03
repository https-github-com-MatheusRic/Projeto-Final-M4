import { Router } from "express"

import createCustomerController from "../controllers/customers/createCustomer.controller"
import listCustomersController from "../controllers/customers/listCustomers.controller"
import listOneCustomerController from "../controllers/customers/listOneCustomer.controller"
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware"

const routes = Router()

export const costumersRouter = () => {
  routes.post("/", createCustomerController)
  routes.get("/", ensureAuthMiddleware, listCustomersController)
  routes.get("/:id", ensureAuthMiddleware, listOneCustomerController)
  routes.patch("/:id", ensureAuthMiddleware)
  routes.delete("/:id", ensureAuthMiddleware)

  return routes
}
