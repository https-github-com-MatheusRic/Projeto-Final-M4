import AppDataSource from "../../data-source"
import { Category } from "../../entities/category.entitie"

const listCategoriesServices = async (): Promise<Category[]> => {
  const categoriesRepository = AppDataSource.getRepository(Category)
  const categories = await categoriesRepository.find()

  return categories
}
export default listCategoriesServices
