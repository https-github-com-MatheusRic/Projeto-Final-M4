import { DataSource } from "typeorm"
import request from "supertest"
import * as uuid from "uuid"

import AppDataSource from "../../../data-source"
import app from "../../../app"

import { mockedBudget, mockedUser, mockedUserLogin } from "../../mocks"

jest.mock("uuid")
let tokenUser = ""

describe("POST - /customers/", () => {
  let connection: DataSource

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err)
      })
  })

  afterAll(async () => {
    await connection.destroy()
  })

  test("Shouldn't be possible to create a new customer without authentication", async () => {
    const errAuthUser = await request(app).post("/budgets").send(mockedBudget)

    expect(errAuthUser.status).toBe(401)
    expect(errAuthUser.body).toMatchObject({
      message: "missing token",
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
