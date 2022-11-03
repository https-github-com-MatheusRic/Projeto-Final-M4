import { Request, Response } from "express"
import { ICustomerRequest } from "../../interfaces/customers"
import createCustomerService from "../../services/customers/createCustomer.service"

const createCustomerController = async (req: Request, res: Response) => {
  const data: ICustomerRequest = req.body
  const createdCustomer = await createCustomerService(data)

  return res.status(201).json(createdCustomer)
}

export default createCustomerController