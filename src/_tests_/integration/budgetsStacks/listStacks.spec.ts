import { DataSource } from "typeorm"
import request from "supertest"

import AppDataSource from "../../../data-source"
import app from "../../../app"

import { mockedBudgetStack, mockedUser, mockedUserLogin } from "../../mocks"

let tokenUser = ""

describe("GET - /stacks/", () => {
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

    await request(app)
      .post("/stacks")
      .set("Authorization", `Bearer ${tokenUser}`)
      .send(mockedBudgetStack)
  })

  afterAll(async () => {
    await connection.destroy()
  })

  test("Shouldn't be possible to list the budgets stacks without authentication", async () => {
    const errAuthUser = await request(app).get("/stacks")

    expect(errAuthUser.status).toBe(401)
    expect(errAuthUser.body).toMatchObject({
      message: "missing token",
    })
  })

  test("Should be possible to list the budget stacks", async () => {
    const resListBudgetStacks = await request(app)
      .get("/stacks")
      .set("Authorization", `Bearer ${tokenUser}`)

    expect(resListBudgetStacks.status).toBe(200)
    expect(resListBudgetStacks.body).toHaveProperty("map")
  })
})
