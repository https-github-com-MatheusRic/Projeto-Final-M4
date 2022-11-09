import AppDataSource from "../../data-source"

import { Customer } from "../../entities/customer.entitie"
import { User } from "../../entities/user.entitie"

const listCustomersService = async (userId: string): Promise<Customer[]> => {
  const costumersRepository = AppDataSource.getRepository(Customer)

  const customers = await costumersRepository.find({
    where: {
      user: {
        uuid: userId
      }
    },
    relations: {
      budgets: true
    }
  })

  return customers
}

export default listCustomersService
