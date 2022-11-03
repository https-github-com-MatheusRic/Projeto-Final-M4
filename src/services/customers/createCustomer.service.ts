import AppDataSource from "../../data-source"
import { Customer } from "../../entities/customer.entitie"
import { ICustomerRequest } from "../../interfaces/customers"
import AppError from '../../errors/appError';

const createCustomerService = async (
  data: ICustomerRequest
): Promise<Customer> => {
  const customerRepository = AppDataSource.getRepository(Customer)

  const newCustomer = customerRepository.create({
    ...data,
  })

  await customerRepository.save(newCustomer)

  return newCustomer
}

export default createCustomerService