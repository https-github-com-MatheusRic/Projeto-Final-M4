//import Budget entity
import AppDataSource from "../../data-source"
import AppError from "../../errors/appError"
import { IBudgetUpdate } from "../../interfaces/budgets"

const editBudgetService = async ({ ...data }: IBudgetUpdate, , idBudgetToUpdate: string, idUser: string): Promise<Budget> => {
  const budgetRepository = AppDataSource.getRepository(Budget)

  const budgetToUpdate = await budgetRepository.findOne({
    where: {
      id: idBudgetToUpdate,
    },
  })
  
  if (!budgetToUpdate) {
    throw new AppError("Budget not found", 404)
  } 
  
  else if (idUser !== budgetToUpdate.userId) {
    throw new AppError("Unauthorized access", 401)
  } 
  
  else if (Object.keys(data).includes('id') || Object.keys(data).includes('isAdm') || Object.keys(data).includes('isActive')) {
    throw new AppError("You cant change the user's attributes: id, isAdm or isActive", 401)
  }

  await userRepository.update(idToUpdate, {
    ...userToUpdate,
    ...data,
    password: data.password ? await hash(data.password, 10) : userToUpdate.password
  })

  const updatedUser = await userRepository.findOne({
    where: {
      id: idToUpdate,
    },
  })

  return updatedUser!
}

export default editUserService