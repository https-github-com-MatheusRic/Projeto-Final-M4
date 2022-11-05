import { Request, Response } from "express"

import listOneCustomerService from "../../services/customers/listOneCustomer.service"

const listOneCustomerController = async (req: Request, res: Response) => {
  const customerId = req.params.uuid
  const userId = req.user.uuid

  const customers = await listOneCustomerService(customerId, userId)

  return res.json(customers)
}

export default listOneCustomerController
