import { Request, Response } from "express"
import listCustomersService from "../../services/customers/listCustomers.service"

const listCustomersController = async (req: Request, res: Response) => {

  const customers = await listCustomersService()

  return res.json(customers)
}

export default listCustomersController