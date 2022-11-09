import { Request, Response } from "express"
import deleteCategoryServices from "../../services/categories/deleteCategory.services"

const deleteCategoryControllers = async (req: Request, res: Response) => {
  const id = req.params.uuid
  await deleteCategoryServices(id)

  return res.status(204).send()
}
export default deleteCategoryControllers
