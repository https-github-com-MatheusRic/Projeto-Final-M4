import AppDataSource from "../../data-source"
import AppError from "../../errors/appError"
import { BudgetStack } from "../../entities/budgetStack.entitie"

interface IStatusReturn {
  message: string
  statuscode: number
}

const deleteStackService = async (id: string): Promise<void> => {
  const deleteStackRepository = AppDataSource.getRepository(BudgetStack)
  const stackToDelete = await deleteStackRepository.findOneBy({ uuid: id })

  if (!stackToDelete) {
    throw new AppError("Budget stack not found", 404)
  }

  await deleteStackRepository.delete(stackToDelete)

  return 
}
export default deleteStackService
