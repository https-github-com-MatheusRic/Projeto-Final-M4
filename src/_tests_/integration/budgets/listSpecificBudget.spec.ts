import { DataSource } from "typeorm"
import request from "supertest"

import AppDataSource from "../../../data-source"
import app from "../../../app"

import { IBudget } from "../../../interfaces/budgets"
import {
  mockedBudget,
  mockedBudgetStack,
  mockedCategory,
  mockedCustomer,
  mockedUser,
  mockedUserLogin,
} from "../../mocks"

let customerId: any
let categoryId: any
let budgetStackId: any
let tokenUser = ""
let budgetId = ""
let budget: IBudget

describe("GET - /budgets/:uuid/", () => {
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

    const resCreateBudget = await request(app)
      .post("/budgets")
      .set("Authorization", `Bearer ${tokenUser}`)
      .send({
        ...mockedBudget,
        customerId,
        categoryId,
        budgetStackId,
      })

    budget = resCreateBudget.body
    budgetId = resCreateBudget.body.uuid
  })

  afterAll(async () => {
    await connection.destroy()
  })

  test("Shouldn't be possible to list a specific budget without authentication", async () => {
    const errAuthUser = await request(app).get(`/budgets/${budgetId}`)

    expect(errAuthUser.status).toBe(401)
    expect(errAuthUser.body).toMatchObject({
      message: "missing token",
    })
  })

  test("Shouldn't be possible to list a specific budget that does not exist", async () => {
    const resListSpecificBudget = await request(app)
      .get("/budgets/invalid_id")
      .set("Authorization", `Bearer ${tokenUser}`)

    expect(resListSpecificBudget.status).toBe(404)
    expect(resListSpecificBudget.body).toMatchObject({
      message: "Budget not found",
    })
  })

  test("Shouldn't be possible to list a specific budget from another user", async () => {
    await request(app)
      .post("/users")
      .send({ ...mockedUser, email: "anotherUser@email.com" })

    const resLogin = await request(app)
      .post("/login")
      .send({ ...mockedUserLogin, email: "anotherUser@email.com" })
    const differentToken = resLogin.body.token

    const resListSpecificBudget = await request(app)
      .get(`/budgets/${budgetId}`)
      .set("Authorization", `Bearer ${differentToken}`)

    expect(resListSpecificBudget.status).toBe(401)
    expect(resListSpecificBudget.body).toMatchObject({
      message: "Unauthorized access",
    })
  })

  test("Should be possible to list a specific budget", async () => {
    const resListSpecificBudget = await request(app)
      .get(`/budgets/${budgetId}`)
      .set("Authorization", `Bearer ${tokenUser}`)

    expect(resListSpecificBudget.status).toBe(200)
    expect(resListSpecificBudget.body).toMatchObject(budget)
  })
})
