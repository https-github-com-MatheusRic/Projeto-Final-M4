import AppDataSource from "../../data-source"
import AppError from "../../errors/appError"
import { BudgetStack } from "../../entities/budgetStack.entitie"

const listOneStackService = async (id: string): Promise<BudgetStack>  => {
   const listOneStackRepository = AppDataSource.getRepository(BudgetStack)
   const stackToBeListed = await listOneStackRepository.findOneBy({ uuid: id })

   if(!stackToBeListed){
    throw new AppError( "Budget stack not found", 404)
   }

   return stackToBeListed
}
export default listOneStackService