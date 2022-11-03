import AppDataSource from "../../data-source";
import AppError from "../../errors/appError";
import { BudgetStack } from "../../entities/budgetStack.entitie";
//falta promise?

const listOneStackService = async (id: string)  => {
   const listOneStackRepository = AppDataSource.getRepository(BudgetStack)
   const stackToBeListed = await listOneStackRepository.findOne({
    where:{
        uuid : id
    }
   })

   if(!stackToBeListed){
    throw new AppError( "Stack does not exists", 404)
   }

   return stackToBeListed


}
export default listOneStackService