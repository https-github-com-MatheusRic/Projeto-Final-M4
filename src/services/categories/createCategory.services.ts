import AppDataSource from "../../data-source";
import AppError from "../../errors/appError";
import { ICategoryRequest } from "../../interfaces/categories";
import { Category } from "../../entities/category.entitie";

<<<<<<< HEAD


const createCategoryService = async ({name}:ICategoryRequest): Promise<Category> => {

    const categoryRepository = AppDataSource.getRepository(Category)

    const categoryAlreadyExists = await categoryRepository.findOne({
        where:{
            name : name
        }
    })
=======
const createCategoryService = async ({
  name,
}: ICategoryRequest): Promise<Category> => {
  const categoryRepository = AppDataSource.getRepository(Category);

  const categoryAlreadyExists = await categoryRepository.findOne({
    where: {
      name,
    },
  });

  if (categoryAlreadyExists) {
    throw new AppError("Category already exists", 400);
  }

  const newCategory = categoryRepository.create({
    name,
  });
>>>>>>> fd1ea4dc557b3c737797958e70c1e86a86b18574

  await categoryRepository.save(newCategory);

  return newCategory;
};
export default createCategoryService;
