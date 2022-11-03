import { Request, Response } from "express"
import { ICustomerRequest } from "../../interfaces/customers"
import createCustomerService from "../../services/customers/createCustomer.service"

const createCustomerController = async (req: Request, res: Response) => {
  const data = req.body
  const userId = req.user.uuid
  
  const createdCustomer = await createCustomerService(data, userId)

  return res.status(201).json(createdCustomer)
}

export default createCustomerController