import AppDataSource from "../../data-source";
import AppError from "../../errors/appError";
import { Category } from "../../entities/category.entitie";

const deleteCategoryServices = async (id: string): Promise<void> => {
  const categoryRepository = AppDataSource.getRepository(Category);
  const categoryToDelete = await categoryRepository.findOneBy({ uuid: id });

  if (!categoryToDelete) {
    throw new AppError("Category not found", 404);
  }

  await categoryRepository.delete(categoryToDelete);

  return;
};
export default deleteCategoryServices;
