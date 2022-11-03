import { DataSource } from "typeorm"
import request from "supertest"

import AppDataSource from "../../../data-source"
import app from "../../../app"

import { mockedCustomer, mockedUser, mockedUserLogin } from "../../mocks"
import { ICustomerResponse } from "../../../interfaces/customers"

let tokenUser = ""
let customerId = ""
let customer: ICustomerResponse

describe("GET - /customers/:uuid/", () => {
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

    const resCreateCustomer = await request(app)
      .post("/customers")
      .set("Authorization", `Bearer ${tokenUser}`)
      .send(mockedCustomer)

    customer = resCreateCustomer.body
    customerId = resCreateCustomer.body.uuid
  })

  afterAll(async () => {
    await connection.destroy()
  })

  test("Shouldn't be possible to list a specific customer without authentication", async () => {
    const errAuthUser = await request(app).get(`/customers/${customerId}`)

    expect(errAuthUser.status).toBe(401)
    expect(errAuthUser.body).toMatchObject({
      message: "missing token",
    })
  })

  test("Shouldn't be possible to list a specific customer that does not exist", async () => {
    const resListOneCustomer = await request(app)
      .get("/customers/invalid_id")
      .set("Authorization", `Bearer ${tokenUser}`)

    expect(resListOneCustomer.status).toBe(404)
    expect(resListOneCustomer.body).toMatchObject({
      message: "Customer not found",
    })
  })

  test("Shouldn't be possible to list a specific customer from another user", async () => {
    await request(app)
      .post("/users")
      .send({ ...mockedUser, email: "anotherUser@email.com" })

    const resLogin = await request(app)
      .post("/login")
      .send({ ...mockedUserLogin, email: "anotherUser@email.com" })
    const differentToken = resLogin.body.token

    const resListOneCustomer = await request(app)
      .get(`/customers/${customerId}`)
      .set("Authorization", `Bearer ${differentToken}`)

    expect(resListOneCustomer.status).toBe(401)
    expect(resListOneCustomer.body).toMatchObject({
      message: "Unauthorized access",
    })
  })

  test("Should be possible to list a specific customer", async () => {
    const resListOneCustomer = await request(app)
      .get(`/customers/${customerId}`)
      .set("Authorization", `Bearer ${tokenUser}`)

    expect(resListOneCustomer.status).toBe(200)
    expect(resListOneCustomer.body).toMatchObject(customer)
  })
})
