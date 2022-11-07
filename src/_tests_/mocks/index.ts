import { IUserCreate, IUserLogin, IUserUpdate } from "../../interfaces/users"
import { IBudgetRequest, IBudgetUpdate } from "../../interfaces/budgets"
import { ICustomerRequest, ICustomerUpdate } from "../../interfaces/customers"
import { IBudgetStack } from "../../interfaces/budgetsStacks"
import { ICategoryRequest } from "../../interfaces/categories"

export const mockedUser: IUserCreate = {
  email: "test@email.com",
  password: "password123",
  name: "Bruna",
  username: "brunaTeste",
  position: "Junior",
};

export const mockedUserLogin: IUserLogin = {
  email: "test@email.com",
  password: "password123",
};

export const mockedUserUpdate: IUserUpdate = {
  name: "Bruna 2",
};

export const mockedCustomer: ICustomerRequest = {
  name: "Gabriel",
  isCompany: false,
  email: 'gabriel@email.com',
  contact: '5511988888888'
}

export const mockedCustomerUpdate: ICustomerUpdate = {
  name: "Gabriel A.",
}

export const mockedBudgetStack: IBudgetStack = {
  stack: "Full Stack",
}

export const mockedCategory: ICategoryRequest = {
  name: "Gabriel A.",
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
};

export const mockedBudgetUpdate: IBudgetUpdate = {
  name: "Kenzie Blog",
};