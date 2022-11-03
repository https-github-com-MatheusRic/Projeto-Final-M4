import { Request, Response } from "express"
import { ICustomerUpdate } from "../../interfaces/customers"
import updateCustomerService from "../../services/customers/updateCustomer.service"

const updateCustomerController = async (req: Request, res: Response) => {
  const dataToEdit: ICustomerUpdate = req.body
  const customerId: string = req.params.id; 

  const updatedCustomer = await updateCustomerService(dataToEdit, customerId)

  return res.status(200).json(updatedCustomer)
}

export default updateCustomerController