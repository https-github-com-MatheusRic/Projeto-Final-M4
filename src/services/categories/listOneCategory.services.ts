import AppDataSource from "../../data-source";
import AppError from "../../errors/appError";
import { Category } from "../../entities/category.entitie";
//falta promise?


const listOneCategoryServices = async (id:string) => {
    const listOneCategoryRepository = AppDataSource.getRepository(Category)
    const categroryToBeListed = listOneCategoryRepository.findOne({
    where:{
        id: id
    }
    })

    if(!categroryToBeListed){
        throw new AppError( "Category does not exists", 404)
    }

    return categroryToBeListed

}
export default listOneCategoryServices