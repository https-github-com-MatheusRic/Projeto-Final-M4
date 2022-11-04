import { DataSource } from "typeorm";
import request from "supertest";

import AppDataSource from "../../../data-source";
import app from "../../../app";

import { mockedUser } from "./../../mocks/index";

describe("POST - /users/", () => {
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

test("Shouldn't be possible to create two users with the same email", async () => {
  const result = await request(app).post("/users").send(mockedUser);

  expect(result.body).toHaveProperty("message");
  expect(result.status).toBe(400);
});

test("Should be possible to create a new budget", async () => {
  const result = await request(app).post("/users").send(mockedUser);

  expect(result.status).toBe(201);
  expect(result.body).toHaveProperty("uuid");
  expect(result.body).toHaveProperty("name");
  expect(result.body).toHaveProperty("email");
  expect(result.body).toHaveProperty("username");
  expect(result.body).toHaveProperty("possition");
  expect(result.body).not.toHaveProperty("password");
});
