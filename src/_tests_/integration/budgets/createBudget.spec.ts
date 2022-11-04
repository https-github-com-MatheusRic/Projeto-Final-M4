import { DataSource } from "typeorm"
import request from "supertest"
import * as uuid from "uuid"

import AppDataSource from "../../../data-source"
import app from "../../../app"

import { mockedBudget, mockedUser, mockedUserLogin } from "../../mocks"

jest.mock("uuid")
let tokenUser = ""

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
    const budgetData = { ...mockedBudget, customerId: "invalid_id" }

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
    const budgetData = { ...mockedBudget, budgetStackId: "invalid_id" }

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
    const budgetData = { ...mockedBudget, categoryId: "invalid_id" }

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
    const uuidSpy = jest.spyOn(uuid, "v4")
    uuidSpy.mockReturnValue("some-uuid")

    const resCreateBudget = await request(app)
      .post("/budgets")
      .set("Authorization", `Bearer ${tokenUser}`)
      .send(mockedBudget)

    expect(resCreateBudget.status).toBe(201)
    expect(uuidSpy).toHaveBeenCalled()
    expect(resCreateBudget.body).toEqual(
      expect.objectContaining({
        uuid: "some-uuid",
        projectName: "Kenzie News",
        projectTime: 25,
        budget: 4500,
        fixedCost: 4000,
        variableCos: 500,
        userId: "",
        categoryId: "",
        customerId: "",
        budgetStackId: "",
      })
    )
  })
})
