import { DataSource } from "typeorm"
import request from "supertest"

import AppDataSource from "../../../data-source"
import app from "../../../app"

import { mockedBudgetStack, mockedUser, mockedUserLogin } from "../../mocks"

let tokenUser = ""
let stackId = ""

describe("DELETE - /stacks/:uuid/ ", () => {
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

    stackId = resCreateBudgetStack.body.uuid
  })

  afterAll(async () => {
    await connection.destroy()
  })

  test("Shouldn't be possible to delete a budget stack without authentication", async () => {
    const errAuthUser = await request(app).delete(`/stacks/${stackId}`)

    expect(errAuthUser.status).toBe(401)
    expect(errAuthUser.body).toMatchObject({
      message: "missing token",
    })
  })

  test("Shouldn't be possible to delete a budget stack that does not exist", async () => {
    const resDeleteBudgetStack = await request(app)
      .delete("/stacks/invalid_id")
      .set("Authorization", `Bearer ${tokenUser}`)

    expect(resDeleteBudgetStack.status).toBe(404)
    expect(resDeleteBudgetStack.body).toMatchObject({
      message: "Budget stack not found",
    })
  })

  test("Should be possible to delete the budget stack", async () => {
    const resDeleteBudgetStack = await request(app)
      .delete(`/stacks/${stackId}`)
      .set("Authorization", `Bearer ${tokenUser}`)

    expect(resDeleteBudgetStack.status).toBe(204)
    expect(resDeleteBudgetStack.body).toMatchObject({
        message: "Stack deleted with sucess!",
    })
  })
})
