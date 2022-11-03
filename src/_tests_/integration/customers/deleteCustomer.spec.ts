import { DataSource } from "typeorm"
import request from "supertest"

import AppDataSource from "../../../data-source"
import app from "../../../app"

import { mockedCustomer, mockedUser, mockedUserLogin } from "../../mocks"

let tokenUser = ""
let customerId = ""

describe("DELETE - /customers/:uuid/ ", () => {
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

    const resCreateUser = await request(app)
      .post("/customers")
      .set("Authorization", `Bearer ${tokenUser}`)
      .send(mockedCustomer)

    customerId = resCreateUser.body.uuid
  })

  afterAll(async () => {
    await connection.destroy()
  })

  test("Shouldn't be possible to delete a customer without authentication", async () => {
    const errAuthUser = await request(app).delete(`/customers/${customerId}`)

    expect(errAuthUser.status).toBe(401)
    expect(errAuthUser.body).toMatchObject({
      message: "missing token",
    })
  })

  test("Shouldn't be possible to delete a customer that does not exist", async () => {
    const resDeleteCustomer = await request(app)
      .delete("/customers/invalid_id")
      .set("Authorization", `Bearer ${tokenUser}`)

    expect(resDeleteCustomer.status).toBe(404)
    expect(resDeleteCustomer.body).toMatchObject({
      message: "Customer not found",
    })
  })

  test("Shouldn't be possible to delete a customer from another user", async () => {
    await request(app)
      .post("/users")
      .send({ ...mockedUser, email: "anotherUser@email.com" })

    const resLogin = await request(app)
      .post("/login")
      .send({ ...mockedUserLogin, email: "anotherUser@email.com" })
    const differentToken = resLogin.body.token

    const resDeleteCustomer = await request(app)
      .delete(`/customers/${customerId}`)
      .set("Authorization", `Bearer ${differentToken}`)

    expect(resDeleteCustomer.status).toBe(401)
    expect(resDeleteCustomer.body).toMatchObject({
      message: "Unauthorized access",
    })
  })

  test("Should be possible to delete the customer", async () => {
    const resDeleteCustomer = await request(app)
      .delete(`/customers/${customerId}`)
      .set("Authorization", `Bearer ${tokenUser}`)

    expect(resDeleteCustomer.status).toBe(204)
  })
})
