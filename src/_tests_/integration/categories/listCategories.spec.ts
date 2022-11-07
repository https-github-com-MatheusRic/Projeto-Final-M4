import { DataSource } from "typeorm"
import request from "supertest"

import AppDataSource from "../../../data-source"
import app from "../../../app"

import { mockedCategory, mockedUser, mockedUserLogin } from "../../mocks"

let tokenUser = ""

describe("GET - /categories/", () => {
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
      .post("/categories")
      .set("Authorization", `Bearer ${tokenUser}`)
      .send(mockedCategory)
  })

  afterAll(async () => {
    await connection.destroy()
  })

  test("Shouldn't be possible to list the categories without authentication", async () => {
    const errAuthUser = await request(app).get("/categories")

    expect(errAuthUser.status).toBe(401)
    expect(errAuthUser.body).toMatchObject({
      message: "missing token",
    })
  })

  test("Should be possible to list the categories", async () => {
    const resListcategories = await request(app)
      .get("/categories")
      .set("Authorization", `Bearer ${tokenUser}`)

    expect(resListcategories.status).toBe(200)
    expect(resListcategories.body).toHaveProperty("map")
  })
})
