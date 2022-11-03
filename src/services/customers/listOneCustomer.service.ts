import AppDataSource from "../../data-source"
import { Customer } from "../../entities/customer.entitie"
import AppError from "../../errors/appError"

const listOneCustomerService = async (
  customerId: string
): Promise<Customer> => {
  const customerRepository = AppDataSource.getRepository(Customer)
  const customer = await customerRepository.findOneBy({ uuid: customerId })

  if (!customer) {
    throw new AppError("Customer not found", 404)
  }

  return customer
}

export default listOneCustomerService