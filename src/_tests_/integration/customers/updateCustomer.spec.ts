import { DataSource } from "typeorm"
import request from "supertest"

import AppDataSource from "../../../data-source"
import app from "../../../app"

import {
  mockedCustomer,
  mockedCustomerUpdate,
  mockedUser,
  mockedUserLogin,
} from "../../mocks"

let tokenUser = ""
let customerId = ""

describe("PATCH - /customers/:uuid/ ", () => {
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

    customerId = resCreateCustomer.body.uuid
  })

  afterAll(async () => {
    await connection.destroy()
  })

  test("Shouldn't be possible to update a customer without authentication", async () => {
    const errAuthUser = await request(app)
      .patch(`/customers/${customerId}`)
      .send(mockedCustomerUpdate)

    expect(errAuthUser.status).toBe(401)
    expect(errAuthUser.body).toMatchObject({
      message: "missing token",
    })
  })

  test("Shouldn't be possible to send empty fields", async () => {
    const resUpdateCustomer = await request(app)
      .patch("/customers/invalid_id")
      .set("Authorization", `Bearer ${tokenUser}`)
      .send()

    expect(resUpdateCustomer.body).toMatchObject({
      message: "No fields to edit",
    })
  })

  test("Shouldn't be possible to update a customer that does not exist", async () => {
    const resUpdateCustomer = await request(app)
      .patch("/customers/invalid_id")
      .set("Authorization", `Bearer ${tokenUser}`)
      .send(mockedCustomerUpdate)

    expect(resUpdateCustomer.status).toBe(404)
    expect(resUpdateCustomer.body).toMatchObject({
      message: "Customer not found",
    })
  })

  test("Shouldn't be possible to update a customer from another user", async () => {
    await request(app)
      .post("/users")
      .send({ ...mockedUser, email: "anotherUser@email.com" })

    const resLogin = await request(app)
      .post("/login")
      .send({ ...mockedUserLogin, email: "anotherUser@email.com" })
    const differentToken = resLogin.body.token

    const resUpdateCustomer = await request(app)
      .patch(`/customers/${customerId}`)
      .set("Authorization", `Bearer ${differentToken}`)
      .send(mockedCustomerUpdate)

    expect(resUpdateCustomer.status).toBe(401)
    expect(resUpdateCustomer.body).toMatchObject({
      message: "Unauthorized access",
    })
  })

  test("Shouldn't be possible to update these customers's attributes: uuid and userId", async () => {
    const resUpdateCustomer = await request(app)
      .patch(`/customers/${customerId}`)
      .set("Authorization", `Bearer ${tokenUser}`)
      .send({ ...mockedCustomerUpdate, uuid: "new_uuid" })

    expect(resUpdateCustomer.status).toBe(401)
    expect(resUpdateCustomer.body).toMatchObject({
      message: "Accepted fields only: name, isCompany, email and contact",
    })
  })

  test("Should be possible to update the customer", async () => {
    const resUpdateCustomer = await request(app)
      .patch(`/customers/${customerId}`)
      .set("Authorization", `Bearer ${tokenUser}`)
      .send(mockedCustomerUpdate)

    expect(resUpdateCustomer.status).toBe(201)
    expect(resUpdateCustomer.body.name).toEqual("Gabriel A.")
  })
})
