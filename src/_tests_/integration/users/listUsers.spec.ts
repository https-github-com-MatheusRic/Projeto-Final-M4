import { mockedUserLogin, mockedUser } from "./../../mocks/index";
import request from "supertest";
import app from "../../../app";
import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";

let user: any;
let tokenUser = "";

describe("GET - /users/", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((error) => {
        console.log(error);
      });

    user = await request(app).post("/users").send(mockedUser);

    const resLogin = await request(app).post("/login").send(mockedUserLogin);
    tokenUser = resLogin.body.token;
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("GET /users -> Must be able to list all users", async () => {
    const result = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${tokenUser}`);

    expect(result.status).toBe(200);
    expect(result.body).toHaveLength(1);
  });

  test("GET /users -> Should not be able to list users without authorization", async () => {
    const result = await request(app).get("/users");

    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty("message");
  });
});
