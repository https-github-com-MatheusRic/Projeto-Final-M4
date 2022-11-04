import { DataSource } from "typeorm"
import request from "supertest"

import AppDataSource from "../../../data-source"
import app from "../../../app"

import { mockedBudgetStack, mockedUser, mockedUserLogin } from "../../mocks"

let tokenUser = ""

describe("POST - /stacks/", () => {
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
  })

  afterAll(async () => {
    await connection.destroy()
  })

  test("Shouldn't be possible to create a new budget stack without authentication", async () => {
    const errAuthUser = await request(app).post("/stacks").send(mockedBudgetStack)

    expect(errAuthUser.status).toBe(401)
    expect(errAuthUser.body).toMatchObject({
      message: "missing token",
    })
  })

  
  test("Should be possible to create a new budget stack", async () => {
    
    const resCreateBudgetStack = await request(app)
      .post("/stacks")
      .set("Authorization", `Bearer ${tokenUser}`)
      .send(mockedBudgetStack)

    expect(resCreateBudgetStack.status).toBe(201)
    expect(resCreateBudgetStack.body).toEqual(
      expect.objectContaining({
        stack: "Full Stack"
      })
    )
  })

  test("Shouldn't be possible to create a budget stack that already exists", async () => {
    const resCreateBudgetStack = await request(app)
      .post("/stacks")
      .set("Authorization", `Bearer ${tokenUser}`)
      .send(mockedBudgetStack)

    expect(resCreateBudgetStack.status).toBe(404)
    expect(resCreateBudgetStack.body).toMatchObject({
      message: "Category already exists",
    })
  })
})
