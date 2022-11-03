import { Router } from "express"

import createCategoriesControllers from "../controllers/categories/createCategory.controllers"
import deleteCategoryControllers from "../controllers/categories/deleteCategory.controllers"
import listCategoriesControllers from "../controllers/categories/listCategories.controllers"
import listOneCategoryControllers from "../controllers/categories/listOneCatgory.controllers"

import validadeSerializerMiddleware from "../middlewares/validateSerializer.middleware"

import { createCategorySerializer } from "../serializers/category.serializer"

const routes = Router()

export const categoriesRouter = () => {
  routes.post(
    "/", 
    validadeSerializerMiddleware(createCategorySerializer),
    createCategoriesControllers
  )
  routes.get("/", listCategoriesControllers)
  routes.get("/:uuid", listOneCategoryControllers)
  routes.delete("/:uuid", deleteCategoryControllers)

  return routes
}
