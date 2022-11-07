import { mockedUser, mockedUserWithId } from "./../../mocks/index";
import request from "supertest";
import app from "../../../app";
import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";

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

  test("POST /users -> Must be able to create a new user", async () => {
    const result = await request(app).post("/users").send(mockedUser);

    expect(result.status).toBe(201);
    expect(result.body).toHaveProperty("uuid");
    expect(result.body).toHaveProperty("name");
    expect(result.body).toHaveProperty("email");
    expect(result.body).toHaveProperty("username");
    expect(result.body).toHaveProperty("position");
    expect(result.body).not.toHaveProperty("password");
  });

  test("POST /users -> It should not be possible to create two users with the same email", async () => {
    const result = await request(app).post("/users").send(mockedUser);

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("message");
  });

  test("POST /users -> It should not be possible to create a user if some mandatory field is missing", async () => {
    const newUser = { name: "jose da silva" };
    const result = await request(app).post("/users").send(newUser);

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("message");
  });

  test("POST /users -> It should not be possible to create a user by passing the UUID property", async () => {
    const result = await request(app).post("/users").send(mockedUserWithId);

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("message");
  });
});
