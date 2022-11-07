import { Request, Response } from "express"

import createCustomerService from "../../services/customers/createCustomer.service"

const createCustomerController = async (req: Request, res: Response) => {
  const data = req.body
  const userId = req.user.uuid

  const createdCustomer = await createCustomerService(data, userId)
  const response = {...createdCustomer, user: {
    uuid: createdCustomer.user.uuid,
    name: createdCustomer.user.name
  }}

  return res.status(201).json(response)
}

export default createCustomerController
