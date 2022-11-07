import { Request, Response } from "express"

import listOneCustomerService from "../../services/customers/listOneCustomer.service"

const listOneCustomerController = async (req: Request, res: Response) => {
  const customerId = req.params.uuid
  const userId = req.user.uuid

  const customer = await listOneCustomerService(customerId, userId)
  const response = {...customer, user: {
    uuid: customer.user.uuid,
    name: customer.user.name
  }}

  return res.json(response)
}

export default listOneCustomerController
