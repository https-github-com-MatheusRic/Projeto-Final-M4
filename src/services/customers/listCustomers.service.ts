import AppDataSource from "../../data-source"
import { Customer } from "../../entities/customer.entitie"
import { User } from "../../entities/user.entitie"

const listCustomersService = async (userId: string): Promise<Customer[]> => {
  const userRepository = AppDataSource.getRepository(User)

  const user = await userRepository.findOne({
    where: {
      uuid: userId,
    },
    relations: {
      customers: true,
    },
  })

  return user!.customers
}

export default listCustomersService