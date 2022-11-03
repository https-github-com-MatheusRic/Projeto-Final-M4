import { Request, Response } from "express"
import deleteCustomerService from "../../services/customers/deleteCustomer.service"

const deleteCustomerController = async (req: Request, res: Response) => {
  const customerId = req.params.uuid
  const userId = req.user.uuid

  await deleteCustomerService(customerId, userId)

  return res.status(204).send()
}

export default deleteCustomerController
