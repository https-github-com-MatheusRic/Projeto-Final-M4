import AppDataSource from "../../data-source"
import { Customer } from "../../entities/customer.entitie"
import AppError from "../../errors/appError"

const deleteCustomerService = async (id: string): Promise<void> => {
  const customerRepository = AppDataSource.getRepository(Customer)

  const foundCustomer = await customerRepository.findOneBy({ uuid: id })

  if (!foundCustomer) {
    throw new AppError("Customer not found", 404)
  }

  await customerRepository.delete(id)

  const deletedCustomer = await customerRepository.findOneBy({ uuid: id })

  if (deletedCustomer) {
    throw new AppError("User not deleted")
  }

  return
}
export default deleteCustomerService
