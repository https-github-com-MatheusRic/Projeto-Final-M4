import { IUserCreate, IUserLogin } from "../../interfaces/users"
import { IBudgetRequest, IBudgetUpdate } from "../../interfaces/budgets"
import { ICustomerRequest, ICustomerUpdate } from "../../interfaces/customers"

export const mockedUser: IUserCreate = {
  email: "test@email.com",
  password: "password123",
  name: "Bruna",
  username: "brunaTeste",
  position: "Junior",
}

export const mockedUserLogin: IUserLogin = {
  email: "test@email.com",
  password: "password123",
}

export const mockedBudget: IBudgetRequest = {
  projectName: "Kenzie News",
  projectTime: 25,
  budget: 4500,
  fixedCost: 4000,
  variableCost: 500,
  categoryId: "",
  customerId: "",
  budgetStackId: "",
}

export const mockedBudgetUpdate: IBudgetUpdate = {
  name: "Kenzie Blog",
}

export const mockedCustomer: ICustomerRequest = {
  name: "Gabriel",
  isCompany: false,
  email: 'gabriel@email.com',
  contact: '5511988888888'
}

export const mockedCustomerUpdate: ICustomerUpdate = {
  name: "Gabriel A.",
}
