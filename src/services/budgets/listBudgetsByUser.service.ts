//import Budget
import AppDataSource from "../../data-source"

const listBudgetsByUserService = async (userId: string): Promise<Budget[]> => {
  const userRepository = AppDataSource.getRepository(User)

  const user = await userRepository.findOne({
    where: {
      id: userId
    },
    relations: {
      budgets: true
    }
  })

  return user!.budgets
}

export default listBudgetsByUserService
