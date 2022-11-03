import { DataSource } from "typeorm"
import request from "supertest"

import AppDataSource from "../../../data-source"
import app from "../../../app"

import { mockedCustomer, mockedUser, mockedUserLogin } from "../../mocks"

let tokenUser = ""

describe("GET - /customers/", () => {
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
      .post("/customers")
      .set("Authorization", `Bearer ${tokenUser}`)
      .send(mockedCustomer)
  })

  afterAll(async () => {
    await connection.destroy()
  })

  test("Shouldn't be possible to list the user's customers without authentication", async () => {
    const errAuthUser = await request(app).get("/customers")

    expect(errAuthUser.status).toBe(401)
    expect(errAuthUser.body).toMatchObject({
      message: "missing token",
    })
  })

  test("Should be possible to list the user's customers", async () => {
    const resListUsersCustomers = await request(app)
      .get("/customers")
      .set("Authorization", `Bearer ${tokenUser}`)

    expect(resListUsersCustomers.body).toHaveProperty("map")
  })
})
