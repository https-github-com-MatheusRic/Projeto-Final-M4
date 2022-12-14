import AppDataSource from "../../data-source"
import { BudgetStack } from "../../entities/budgetStack.entitie"

const listStacksServices = async (): Promise<BudgetStack[]> => {
   const listStacksRepository = AppDataSource.getRepository(BudgetStack)
   const stacks = await listStacksRepository.find()

   return stacks
}
export default listStacksServices