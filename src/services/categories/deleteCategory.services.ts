import AppDataSource from "../../data-source"
import AppError from "../../errors/appError"
import { Category } from "../../entities/category.entitie"


interface IStatusReturn {
  message: string
  statuscode: number
}

const deleteCategoryServices = async (id: string): Promise<IStatusReturn> => {
  const categoryRepository = AppDataSource.getRepository(Category)
  const categoryToDelete = await categoryRepository.findOneBy({uuid: id})

  if (!categoryToDelete) {
    throw new AppError("Category does not exists", 404);
  }

  await categoryRepository.delete(categoryToDelete);

  return {
    message: "Category deleted with sucess!",
    statuscode: 204
  }

}
export default deleteCategoryServices

