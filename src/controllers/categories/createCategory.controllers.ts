import { Request, Response } from "express"
import createCategoryService from "../../services/categories/createCategory.services"

const createCategoriesControllers = async (req: Request, res: Response) => {
  const data = req.body
  const newCategoryCreated = await createCategoryService(data)

  return res.status(201).json(newCategoryCreated)
}
export default createCategoriesControllers
