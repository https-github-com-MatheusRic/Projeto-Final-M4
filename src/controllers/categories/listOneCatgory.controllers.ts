import { Request, Response } from "express"
import listOneCategoryServices from "../../services/categories/listOneCategory.services"

const listOneCategoryControllers = async (req: Request, res: Response) => {
  const id = req.params.uuid
  const listedOneCategory = await listOneCategoryServices(id)

  return res.status(200).json(listedOneCategory)
}
export default listOneCategoryControllers
