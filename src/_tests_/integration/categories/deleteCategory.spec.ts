import { DataSource } from "typeorm"
import request from "supertest"

import AppDataSource from "../../../data-source"
import app from "../../../app"

import { mockedCategory, mockedUser, mockedUserLogin } from "../../mocks"

let tokenUser = ""
let categoryId = ""

describe("DELETE - /categories/:uuid/ ", () => {
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

    const resCreateCategory = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${tokenUser}`)
      .send(mockedCategory)

    categoryId = resCreateCategory.body.uuid
  })

  afterAll(async () => {
    await connection.destroy()
  })

  test("Shouldn't be possible to delete a category without authentication", async () => {
    const errAuthUser = await request(app).delete(`/categories/${categoryId}`)

    expect(errAuthUser.status).toBe(401)
    expect(errAuthUser.body).toMatchObject({
      message: "missing token",
    })
  })

  test("Shouldn't be possible to delete a category that does not exist", async () => {
    const resDeleteCategory = await request(app)
      .delete("/categories/invalid_id")
      .set("Authorization", `Bearer ${tokenUser}`)

    expect(resDeleteCategory.status).toBe(400)
    expect(resDeleteCategory.body).toMatchObject({
      message: "Category not found",
    })
  })

  test("Should be possible to delete the category", async () => {
    const resDeleteCategory = await request(app)
      .delete(`/categories/${categoryId}`)
      .set("Authorization", `Bearer ${tokenUser}`)

    expect(resDeleteCategory.status).toBe(204)
  })
})
