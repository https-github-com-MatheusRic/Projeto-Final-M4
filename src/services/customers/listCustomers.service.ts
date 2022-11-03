import AppDataSource from "../../data-source"
import { Customer } from "../../entities/customer.entitie"

const listCustomersService = async (): Promise<Customer[]> => {
  const customerRepository = AppDataSource.getRepository(Customer)
  const customers = await customerRepository.find()

  return customers
}

export default listCustomersService