import { Request, Response } from "express"
import { ICustomerUpdate } from "../../interfaces/customers"
import updateCustomerService from "../../services/customers/updateCustomer.service"

const updateCustomerController = async (req: Request, res: Response) => {
  const dataToEdit = req.body
  const customerId = req.params.uuid; 
  const userId = req.user.uuid

  const updatedCustomer = await updateCustomerService(dataToEdit, customerId, userId)

  return res.status(200).json(updatedCustomer)
}

export default updateCustomerController