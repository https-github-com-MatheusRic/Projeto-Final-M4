import AppDataSource from "../../data-source"
import { Customer } from "../../entities/customer.entitie"
import AppError from "../../errors/appError"
import { ICustomerRequest } from "../../interfaces/customers"

const createCustomerService = async (
  data: ICustomerRequest
): Promise<Customer> => {
  const customerRepository = AppDataSource.getRepository(Customer)

  const dataKeys = Object.keys(data)

  dataKeys.forEach((key) => {
    if (
      key !== "name" &&
      key !== "isCompany" &&
      key !== "email" &&
      key !== "contact"
    ) {
      throw new AppError("Accepted fields only: name, isCompany, email, contact")
    }
  })

  const newCustomer = customerRepository.create({
    ...data,
  })

  await customerRepository.save(newCustomer)

  return newCustomer
}

export default createCustomerService