import { DataSource } from "typeorm"
import request from "supertest"

import AppDataSource from "../../../data-source"
import app from "../../../app"

import { mockedBudgetStack, mockedUser, mockedUserLogin } from "../../mocks"
import { IBudgetStackResponse } from "../../../interfaces/budgetsStacks"

let tokenUser = ""
let budgetStackId = ""
let budgetStack: IBudgetStackResponse

describe("GET - /stacks/:uuid/", () => {
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

    const resCreateBudgetStack = await request(app)
      .post("/stacks")
      .set("Authorization", `Bearer ${tokenUser}`)
      .send(mockedBudgetStack)

    budgetStack = resCreateBudgetStack.body
    budgetStackId = resCreateBudgetStack.body.uuid
  })

  afterAll(async () => {
    await connection.destroy()
  })

  test("Shouldn't be possible to list a specific budget stack without authentication", async () => {
    const errAuthUser = await request(app).get(`/stacks/${budgetStackId}`)

    expect(errAuthUser.status).toBe(401)
    expect(errAuthUser.body).toMatchObject({
      message: "missing token",
    })
  })

  test("Shouldn't be possible to list a specific budget stack that does not exist", async () => {
    const resListOneBudgetStack = await request(app)
      .get("/stacks/invalid_id")
      .set("Authorization", `Bearer ${tokenUser}`)

    expect(resListOneBudgetStack.status).toBe(404)
    expect(resListOneBudgetStack.body).toMatchObject({
      message: "Budget stack not found",
    })
  })

  test("Should be possible to list a specific budget stack", async () => {
    const resListOneBudgetStack = await request(app)
      .get(`/stacks/${budgetStackId}`)
      .set("Authorization", `Bearer ${tokenUser}`)

    expect(resListOneBudgetStack.status).toBe(200)
    expect(resListOneBudgetStack.body).toMatchObject(budgetStack)
  })
})
