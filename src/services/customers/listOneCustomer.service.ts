import AppDataSource from "../../data-source"
import AppError from "../../errors/appError"
import { Customer } from "../../entities/customer.entitie"

const listOneCustomerService = async (
  customerId: string,
  userId: string
): Promise<Customer> => {
  const customerRepository = AppDataSource.getRepository(Customer)

  const customer = await customerRepository.findOneBy({ uuid: customerId })

  if (!customer) {
    throw new AppError("Customer not found.", 404)
  } else if (userId !== customer.user.uuid) {
    throw new AppError("Unauthorized access.", 401)
  }

  return customer
}

export default listOneCustomerService
