import { DataSource } from "typeorm"
import request from "supertest"

import AppDataSource from "../../../data-source"
import app from "../../../app"

import { mockedBudget, mockedUser, mockedUserLogin } from "../../mocks"

let tokenUser = ""

describe("GET - /budgets/", () => {
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
      .post("/budgets")
      .set("Authorization", `Bearer ${tokenUser}`)
      .send(mockedBudget)
  })

  afterAll(async () => {
    await connection.destroy()
  })

  test("Shouldn't be possible to list the user's budgets without authentication", async () => {
    const errAuthUser = await request(app).get("/budgets")

    expect(errAuthUser.status).toBe(401)
    expect(errAuthUser.body).toMatchObject({
      message: "missing token",
    })
  })

  test("Should be possible to list the user's budgets", async () => {
    const resUpdateBudget = await request(app)
      .get("/budgets")
      .set("Authorization", `Bearer ${tokenUser}`)

      
    expect(resUpdateBudget.body).toHaveProperty("map")
  })
})
