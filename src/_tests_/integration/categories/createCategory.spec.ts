import { DataSource } from "typeorm"
import request from "supertest"

import AppDataSource from "../../../data-source"
import app from "../../../app"

import { mockedCategory, mockedUser, mockedUserLogin } from "../../mocks"

let tokenUser = ""

describe("POST - /categories/", () => {
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

  test("Shouldn't be possible to create a new category without authentication", async () => {
    const errAuthUser = await request(app)
      .post("/categories")
      .send(mockedCategory)

    expect(errAuthUser.status).toBe(401)
    expect(errAuthUser.body).toMatchObject({
      message: "missing token",
    })
  })

  test("Should be possible to create a new category", async () => {
    const resCreateCategory = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${tokenUser}`)
      .send(mockedCategory)

    expect(resCreateCategory.status).toBe(201)
    expect(resCreateCategory.body).toEqual(
      expect.objectContaining({
        name: "Digital Games",
      })
    )
  })

  test("Shouldn't be possible to create a category that already exists", async () => {
    const resCreateCategory = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${tokenUser}`)
      .send(mockedCategory)

    expect(resCreateCategory.status).toBe(400)
    expect(resCreateCategory.body).toMatchObject({
      message: "Category already exists",
    })
  })
})
