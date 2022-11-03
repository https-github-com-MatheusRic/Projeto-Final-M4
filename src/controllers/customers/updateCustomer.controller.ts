import { Request, Response } from "express"

import updateCustomerService from "../../services/customers/updateCustomer.service"

const updateCustomerController = async (req: Request, res: Response) => {
  const userId = req.user.uuid
  const dataToEdit = req.body
  const customerId = req.params.uuid

  const updatedCustomer = await updateCustomerService(
    dataToEdit,
    customerId,
    userId
  )

  return res.status(201).json(updatedCustomer)
}

export default updateCustomerController
