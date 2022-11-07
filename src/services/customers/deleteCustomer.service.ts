import AppDataSource from "../../data-source"
import AppError from "../../errors/appError"

import { Customer } from "../../entities/customer.entitie"

const deleteCustomerService = async (
  id: string,
  userId: string
): Promise<void> => {
  const customerRepository = AppDataSource.getRepository(Customer)

  const foundCustomer = await customerRepository.findOne({
    where: {
      uuid: id,
    },
    relations: {
      user: true,
    },
  })

  if (!foundCustomer) {
    throw new AppError("Customer not found", 404)
  } else if (userId !== foundCustomer.user.uuid) {
    throw new AppError("Unauthorized access", 401)
  }

  await customerRepository.delete(id)

  return
}
export default deleteCustomerService
