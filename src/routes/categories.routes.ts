import { Router } from "express"

import validadeSerializerMiddleware from "../middlewares/validateSerializer.middleware"

import { createCategorySerializer } from "../serializers/category.serializer"

const routes = Router()

export const categoriesRouter = () => {
  routes.post(
    "/", 
    validadeSerializerMiddleware(createCategorySerializer),
  )
  routes.get("/")
  routes.get("/:id")
  routes.delete("/:id")

  return routes
}
