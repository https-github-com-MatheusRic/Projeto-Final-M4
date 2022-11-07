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
  const response = {...updatedCustomer, user: {
    uuid: updatedCustomer.user?.uuid,
    name: updatedCustomer.user?.name
  }}

  return res.status(201).json(response)
}

export default updateCustomerController
