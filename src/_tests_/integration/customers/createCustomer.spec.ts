import { DataSource } from "typeorm"
import request from "supertest"
import * as uuid from "uuid"

import AppDataSource from "../../../data-source"
import app from "../../../app"

import {
  mockedCustomer,
  mockedUser,
  mockedUserLogin,
} from "../../mocks"

jest.mock("uuid")
let tokenUser = ""
let user: any

describe("POST - /customers/", () => {
  let connection: DataSource

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err)
      })

    user = await request(app).post("/users").send(mockedUser)

    const resLogin = await request(app).post("/login").send(mockedUserLogin)
    tokenUser = resLogin.body.token
  })

  afterAll(async () => {
    await connection.destroy()
  })

  test("Shouldn't be possible to create a new customer without authentication", async () => {
    const errAuthUser = await request(app).post("/customers").send(mockedCustomer)

    expect(errAuthUser.status).toBe(401)
    expect(errAuthUser.body).toMatchObject({
      message: "missing token",
    })
  })

  test("Should be possible to create a new customer", async () => {
    const uuidSpy = jest.spyOn(uuid, "v4")
    uuidSpy.mockReturnValue("some-uuid")

    const resCreateCustomer = await request(app)
      .post("/customers")
      .set("Authorization", `Bearer ${tokenUser}`)
      .send(mockedCustomer)

    expect(resCreateCustomer.status).toBe(201)
    expect(uuidSpy).toHaveBeenCalled()
    expect(resCreateCustomer.body).toEqual(
      expect.objectContaining({
        uuid: "some-uuid",
        name: "Gabriel",
        isCompany: false,
        email: "gabriel@email.com",
        contact: "5511988888888",
        userId: user.uuid,
      })
    )
  })

  test("Shouldn't be possible to create a customer that already exists", async () => {
    const resCreateCustomer = await request(app)
      .post("/customers")
      .set("Authorization", `Bearer ${tokenUser}`)
      .send(mockedCustomer)

    expect(resCreateCustomer.status).toBe(404)
    expect(resCreateCustomer.body).toMatchObject({
      message: "Customer already exists",
    })
  })
})
