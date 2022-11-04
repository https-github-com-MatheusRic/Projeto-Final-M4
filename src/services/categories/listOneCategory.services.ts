import AppDataSource from "../../data-source";
import AppError from "../../errors/appError";
import { Category } from "../../entities/category.entitie";


const listOneCategoryServices = async (id: string): Promise<Category> => {
  const listOneCategoryRepository = AppDataSource.getRepository(Category);
  const categroryToBeListed = await listOneCategoryRepository.findOneBy({uuid: id});


  if (!categroryToBeListed) {
    throw new AppError("Category does not exists", 404);
  }

  return categroryToBeListed;
};
export default listOneCategoryServices;
