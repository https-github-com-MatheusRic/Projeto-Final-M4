import { IUserCreate, IUserLogin } from "../../interfaces/users"
import { IBudgetRequest, IBudgetUpdate } from "../../interfaces/budgets"

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
