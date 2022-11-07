import { DataSource } from "typeorm"
import request from "supertest"

import AppDataSource from "../../../data-source"
import app from "../../../app"

import {
  mockedBudget,
  mockedBudgetStack,
  mockedCategory,
  mockedCustomer,
  mockedUser,
  mockedUserLogin,
} from "../../mocks"

let tokenUser = ""
let customerId: any
let categoryId: any
let budgetStackId: any

describe("POST - /budgets/", () => {
  let connection: DataSource

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err)
      })

    await request(app).post("/users").send(mockedUser)

    const resLogin = await request(app).post("/login").send(mockedUserLogin)
    tokenUser = resLogin.body.token

    const resCustomer = await request(app)
      .post("/customers")
      .set("Authorization", `Bearer ${tokenUser}`)
      .send(mockedCustomer)
    customerId = resCustomer.body.uuid

    const resCategory = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${tokenUser}`)
      .send(mockedCategory)
    categoryId = resCategory.body.uuid

    const resBudgetStack = await request(app)
      .post("/stacks")
      .set("Authorization", `Bearer ${tokenUser}`)
      .send(mockedBudgetStack)
    budgetStackId = resBudgetStack.body.uuid
  })

  afterAll(async () => {
    await connection.destroy()
  })

  test("Shouldn't be possible to create a new budget without authentication", async () => {
    const errAuthUser = await request(app).post("/budgets").send(mockedBudget)

    expect(errAuthUser.status).toBe(401)
    expect(errAuthUser.body).toMatchObject({
      message: "missing token",
    })
  })

  test("Shouldn't be possible to create a new budget with a customer that does not exist", async () => {
    const budgetData = {
      ...mockedBudget,
      customerId: "invalid_id",
      categoryId,
      budgetStackId,
    }

    const resCreateBudget = await request(app)
      .post("/budgets")
      .set("Authorization", `Bearer ${tokenUser}`)
      .send(budgetData)

    expect(resCreateBudget.status).toBe(404)
    expect(resCreateBudget.body).toMatchObject({
      message: "Customer not found",
    })
  })

  test("Shouldn't be possible to create a new budget with a budget stack that does not exist", async () => {
    const budgetData = {
      ...mockedBudget,
      customerId,
      categoryId,
      budgetStackId: "invalid_id",
    }

    const resCreateBudget = await request(app)
      .post("/budgets")
      .set("Authorization", `Bearer ${tokenUser}`)
      .send(budgetData)

    expect(resCreateBudget.status).toBe(404)
    expect(resCreateBudget.body).toMatchObject({
      message: "Stack not found",
    })
  })

  test("Shouldn't be possible to create a new budget with a category that does not exist", async () => {
    const budgetData = {
      ...mockedBudget,
      customerId,
      categoryId: "invalid_id",
      budgetStackId,
    }

    const resCreateBudget = await request(app)
      .post("/budgets")
      .set("Authorization", `Bearer ${tokenUser}`)
      .send(budgetData)

    expect(resCreateBudget.status).toBe(404)
    expect(resCreateBudget.body).toMatchObject({
      message: "Category not found",
    })
  })

  test("Should be possible to create a new budget", async () => {
    const resCreateBudget = await request(app)
      .post("/budgets")
      .set("Authorization", `Bearer ${tokenUser}`)
      .send({
        ...mockedBudget,
        customerId,
        categoryId,
        budgetStackId,
      })

    expect(resCreateBudget.status).toBe(201)
    expect(resCreateBudget.body).toHaveProperty("uuid")
    expect(resCreateBudget.body).toHaveProperty("projectName")
    expect(resCreateBudget.body).toHaveProperty("projectTime")
    expect(resCreateBudget.body).toHaveProperty("budget")
    expect(resCreateBudget.body).toHaveProperty("fixedCost")
    expect(resCreateBudget.body).toHaveProperty("variableCost")
    expect(resCreateBudget.body).toHaveProperty("user")
    expect(resCreateBudget.body).toHaveProperty("category")
    expect(resCreateBudget.body).toHaveProperty("customer")
    expect(resCreateBudget.body).toHaveProperty("stack")
  })
})
