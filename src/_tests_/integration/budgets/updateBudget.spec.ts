import { DataSource } from "typeorm"
import request from "supertest"

import AppDataSource from "../../../data-source"
import app from "../../../app"

import {
  mockedBudget,
  mockedBudgetStack,
  mockedBudgetUpdate,
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

describe("PATCH - /budgets/:uuid/ ", () => {
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

    budgetId = resCreateBudget.body.uuid
  })

  afterAll(async () => {
    await connection.destroy()
  })

  test("Shouldn't be possible to update a budget without authentication", async () => {
    const errAuthUser = await request(app)
      .patch(`/budgets/${budgetId}`)
      .send(mockedBudgetUpdate)

    expect(errAuthUser.status).toBe(401)
    expect(errAuthUser.body).toMatchObject({
      message: "missing token",
    })
  })

  test("Shouldn't be possible to send empty fields", async () => {
    const resUpdateBudget = await request(app)
      .patch("/budgets/invalid_id")
      .set("Authorization", `Bearer ${tokenUser}`)
      .send()

    expect(resUpdateBudget.body).toMatchObject({
      message: "No fields to edit",
    })
  })

  test("Shouldn't be possible to update a budget that does not exist", async () => {
    const resUpdateBudget = await request(app)
      .patch("/budgets/invalid_id")
      .set("Authorization", `Bearer ${tokenUser}`)
      .send(mockedBudgetUpdate)

    expect(resUpdateBudget.status).toBe(404)
    expect(resUpdateBudget.body).toMatchObject({
      message: "Budget not found",
    })
  })

  test("Shouldn't be possible to update a budget from another user", async () => {
    await request(app)
      .post("/users")
      .send({ ...mockedUser, email: "anotherUser@email.com" })

    const resLogin = await request(app)
      .post("/login")
      .send({ ...mockedUserLogin, email: "anotherUser@email.com" })
    const differentToken = resLogin.body.token

    const resUpdateBudget = await request(app)
      .patch(`/budgets/${budgetId}`)
      .set("Authorization", `Bearer ${differentToken}`)
      .send(mockedBudgetUpdate)

    expect(resUpdateBudget.status).toBe(401)
    expect(resUpdateBudget.body).toMatchObject({
      message: "Unauthorized access",
    })
  })

  test("Shouldn't be possible to update these budget's attributes: uuid, userId, customerId, stackId and categoryId.", async () => {
    const resUpdateBudget = await request(app)
      .patch(`/budgets/${budgetId}`)
      .set("Authorization", `Bearer ${tokenUser}`)
      .send({ ...mockedBudgetUpdate, uuid: "new_uuid" })

    expect(resUpdateBudget.status).toBe(400)
    expect(resUpdateBudget.body).toMatchObject({
      message:
        "Accepted fields only: projectName, projectTime, budget, fixedCost and variableCost",
    })
  })

  test("Should be possible to update the budget", async () => {
    const resUpdateBudget = await request(app)
      .patch(`/budgets/${budgetId}`)
      .set("Authorization", `Bearer ${tokenUser}`)
      .send(mockedBudgetUpdate)

    expect(resUpdateBudget.status).toBe(201)
    expect(resUpdateBudget.body.projectName).toEqual("Kenzie Blog")
  })
})
