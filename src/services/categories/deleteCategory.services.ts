import AppDataSource from "../../data-source";
//import {category} entidade
import AppError from "../../errors/appError";

// checar regras de negocios , aguardar entitirs e verificar esse retorno da promise

interface IStatusReturn {
    message: string ;
    statuscode: number;
  }

const deleteCategoryServices = async (id:string): Promise<IStatusReturn> => {
  const categoryRepository = AppDataSource.getRepository()
  const categoryToDelete = await categoryRepository.findOne({
    where:{
        id :  id
    }
  })

  if(!categoryToDelete){
    throw new AppError( "Category does not exists", 404)
  }

  await categoryRepository.delete(categoryToDelete)

  return {
    message: "Category deleted!",
    statuscode: 204
  }

}
export default deleteCategoryServices