import { Request, Response  } from "express"
import deleteCategoryServices from "../../services/categories/deleteCategory.services"

const deleteCategoryControllers = async (req: Request ,  res: Response) => {
    const id = req.params.uuid
    const deletedCategory = await deleteCategoryServices(id)

    return res.status(200).json(deletedCategory)

}
export default deleteCategoryControllers