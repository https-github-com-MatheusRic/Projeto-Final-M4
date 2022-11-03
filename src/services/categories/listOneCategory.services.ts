import AppDataSource from "../../data-source";
import AppError from "../../errors/appError";
import { Category } from "../../entities/category.entitie";

const listOneCategoryServices = async (id: string): Promise<Category | null> => {
  const listOneCategoryRepository = AppDataSource.getRepository(Category);
  const categroryToBeListed = listOneCategoryRepository.findOne({
    where: {
      uuid: id,
    },
  });

  if (!categroryToBeListed) {
    throw new AppError("Category does not exists", 404);
  }

  return categroryToBeListed;
};
export default listOneCategoryServices;
