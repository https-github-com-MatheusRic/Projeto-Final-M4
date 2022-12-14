import { DataSource } from "typeorm"
import request from "supertest"

import AppDataSource from "../../../data-source"
import app from "../../../app"

import { mockedBudget, mockedBudgetStack, mockedCategory, mockedCustomer, mockedUser, mockedUserLogin } from "../../mocks"

let customerId: any
let categoryId: any
let budgetStackId: any
let tokenUser = ""
let budgetId = ""

describe("DELETE - /budgets/:uuid/ ", () => {
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

  test("Shouldn't be possible to delete a budget without authentication", async () => {
    const errAuthUser = await request(app).delete(`/budgets/${budgetId}`)

    expect(errAuthUser.status).toBe(401)
    expect(errAuthUser.body).toMatchObject({
      message: "missing token",
    })
  })

  test("Shouldn't be possible to delete a budget that does not exist", async () => {
    const resDeleteBudget = await request(app)
      .delete("/budgets/invalid_id")
      .set("Authorization", `Bearer ${tokenUser}`)

    expect(resDeleteBudget.status).toBe(404)
    expect(resDeleteBudget.body).toMatchObject({
      message: "Budget not found",
    })
  })

  test("Shouldn't be possible to delete a budget from another user", async () => {
    await request(app)
      .post("/users")
      .send({ ...mockedUser, email: "anotherUser@email.com" })

    const resLogin = await request(app)
      .post("/login")
      .send({ ...mockedUserLogin, email: "anotherUser@email.com" })
    const differentToken = resLogin.body.token

    const resDeleteBudget = await request(app)
      .delete(`/budgets/${budgetId}`)
      .set("Authorization", `Bearer ${differentToken}`)

    expect(resDeleteBudget.status).toBe(401)
    expect(resDeleteBudget.body).toMatchObject({
      message: "Unauthorized access",
    })
  })

  test("Should be possible to delete the budget", async () => {
    const resDeleteBudget = await request(app)
      .delete(`/budgets/${budgetId}`)
      .set("Authorization", `Bearer ${tokenUser}`)

    expect(resDeleteBudget.status).toBe(204)
  })
})
