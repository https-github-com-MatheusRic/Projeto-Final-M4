import AppDataSource from "../../data-source"
import AppError from "../../errors/appError"

import { Customer } from "../../entities/customer.entitie"
import { User } from "../../entities/user.entitie"
import { ICustomerRequest } from "../../interfaces/customers"

const createCustomerService = async (
  data: ICustomerRequest,
  userId: string
): Promise<Customer> => {
  const { email } = data

  const customerRepository = AppDataSource.getRepository(Customer)
  const customerAlreadyExists = await customerRepository.findOneBy({ email })

  if (customerAlreadyExists) {
    throw new AppError("Customer already exists", 404)
  }

  const userRepository = AppDataSource.getRepository(User)
  const user = await userRepository.findOneBy({ uuid: userId })

  const newCustomer = customerRepository.create({
    ...data,
    user: user!,
  })

  await customerRepository.save(newCustomer)

  return newCustomer
}

export default createCustomerService
