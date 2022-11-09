import { Router } from "express"
import createCategoriesControllers from "../controllers/categories/createCategory.controllers"
import deleteCategoryControllers from "../controllers/categories/deleteCategory.controllers"
import listCategoriesControllers from "../controllers/categories/listCategories.controllers"
import listOneCategoryControllers from "../controllers/categories/listOneCategory.controllers"
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware"
import validadeSerializerMiddleware from "../middlewares/validateSerializer.middleware"
import { createCategorySerializer } from "../serializers/category.serializer"

const routes = Router()

export const categoriesRouter = () => {
  routes.post("/", validadeSerializerMiddleware(createCategorySerializer),ensureAuthMiddleware,createCategoriesControllers)
  routes.get("/",ensureAuthMiddleware, listCategoriesControllers)
  routes.get("/:uuid",ensureAuthMiddleware, listOneCategoryControllers)
  routes.delete("/:uuid",ensureAuthMiddleware, deleteCategoryControllers)

  return routes
}
