import { Request, Response } from "express"
import listOneCustomerService from "../../services/customers/listOneCustomer.service"

const listOneCustomerController = async (req: Request, res: Response) => {
  const customerId: string = req.params.uuid
  const customers = await listOneCustomerService(customerId)

  return res.json(customers)
}

export default listOneCustomerController