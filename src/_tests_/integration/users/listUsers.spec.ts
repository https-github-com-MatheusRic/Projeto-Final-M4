import { mockedUserLogin, mockedUser } from "./../../mocks/index";
import { DataSource } from "typeorm";
import request from "supertest";

import AppDataSource from "../../../data-source";
import app from "../../../app";

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
  });

  afterAll(async () => {
    await connection.destroy();
  });
});

test("Must be able to list users", async () => {
  await request(app).post("/users").send(mockedUser);
  const loginResponse = await request(app).post("/login").send(mockedUserLogin);
  const response = await request(app)
    .get("/users")
    .set("Authorization", `Bearer ${loginResponse.body.token}`);

  expect(response.body).toHaveLength(2);
});

test("should not be able to list users without authentication", async () => {
  const response = await request(app).get("/users");

  expect(response.body).toHaveProperty("message");
  expect(response.status).toBe(401);
});
