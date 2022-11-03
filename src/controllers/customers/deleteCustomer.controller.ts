import { Request, Response } from "express"
import deleteCustomerService from "../../services/customers/deleteCustomer.service"

const deleteCustomerController = async (req: Request, res: Response) => {
  const customerId: string = req.params.uuid
  await deleteCustomerService(customerId)

  return res.status(204).send()
}

export default deleteCustomerController
