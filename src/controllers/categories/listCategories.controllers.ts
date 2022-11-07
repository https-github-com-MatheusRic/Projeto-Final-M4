import { Request, Response } from "express"
import listCategoriesServices from "../../services/categories/listCategories.services"

const listCategoriesControllers = async (req: Request, res: Response) => {
  const listedCategories = await listCategoriesServices()

  res.status(200).json(listedCategories)
}
export default listCategoriesControllers
