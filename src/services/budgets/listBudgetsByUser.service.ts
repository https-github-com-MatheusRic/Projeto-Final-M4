import AppDataSource from "../../data-source"
import { Budget } from "../../entities/budget.entitie"
import { User } from "../../entities/user.entitie"

const listBudgetsByUserService = async (userId: string): Promise<Budget[]> => {
  const userRepository = AppDataSource.getRepository(User)

  const user = await userRepository.findOne({
    where: {
      uuid: userId,
    },
    relations: {
      budgets: true,
    },
  })

  return user!.budgets
}

export default listBudgetsByUserService
