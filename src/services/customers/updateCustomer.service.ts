import AppDataSource from "../../data-source"
import { Customer } from "../../entities/customer.entitie"
import AppError from "../../errors/appError"
import { ICustomerUpdate } from "../../interfaces/customers"

const updateCustomerService = async (
  data: ICustomerUpdate,
  id: string
): Promise<Customer> => {
  const dataKeys = Object.keys(data)

  if (dataKeys.length === 0) {
    throw new AppError("No fields to edit")
  }

  dataKeys.forEach((key) => {
    if (
      key !== "name" &&
      key !== "isCompany" &&
      key !== "email" &&
      key !== "contact"
    ) {
      throw new AppError(
        "Accepted fields only: name, isCompany, email, contact"
      )
    }
  })

  const customerRepository = AppDataSource.getRepository(Customer)
  const foundCustomer = await customerRepository.findOneBy({ uuid: id })

  if (!foundCustomer) {
    throw new AppError("Customer not found", 404)
  }

  await customerRepository.update(id, {
    ...foundCustomer,
    ...data,
  })

  const updatedCustomer = await customerRepository.findOneBy({ uuid: id })

  return updatedCustomer!
}

export default updateCustomerService
