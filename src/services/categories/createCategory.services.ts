import AppDataSource from "../../data-source";
import AppError from "../../errors/appError";
import { ICategoryRequest } from "../../interfaces/categories";

//add promise de arrays de categorias (entities) e add pra pegar no repositoriio 

const createCategoryService = async ({name}:ICategoryRequest): Promise<> => {

    const categoryRepository = AppDataSource.getRepository()

    const categoryAlreadyExists = await categoryRepository.findOne({
        where:{
            name
        }
    })

    if(categoryAlreadyExists){
     throw new AppError("Category already exists",400)
    }

    const newCategory = categoryRepository.create({
        name
    })

    await categoryRepository.save(newCategory)

    return newCategory
}
export default createCategoryService