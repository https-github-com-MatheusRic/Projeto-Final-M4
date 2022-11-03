import { Request, Response } from "express"

import listCustomersService from "../../services/customers/listCustomers.service"

const listCustomersController = async (req: Request, res: Response) => {
  const userId = req.user.uuid

  const customers = await listCustomersService(userId)

  return res.json(customers)
}

export default listCustomersController
