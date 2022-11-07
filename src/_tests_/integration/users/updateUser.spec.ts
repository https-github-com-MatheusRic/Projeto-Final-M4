import {
  mockedUserLogin,
  mockedUser,
  mockedUserUpdate,
  mockedUserUpdateEmail,
} from "./../../mocks/index";
import request from "supertest";
import app from "../../../app";
import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";

let user: any;

describe("PATCH - /users/", () => {
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
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("PATCH /users/:id -> Must be able to update the user", async () => {
    const userLogin = await request(app).post("/login").send(mockedUserLogin);
    const token = `Bearer ${userLogin.body.token}`;

    const userTobeUpdateRequest = await request(app)
      .get("/users")
      .set("Authorization", token);
    const userTobeUpdateId = userTobeUpdateRequest.body[0].uuid;

    const response = await request(app)
      .patch(`/users/${userTobeUpdateId}`)
      .set("Authorization", token)
      .send(mockedUserUpdate);

    const userUpdated = await request(app)
      .get("/users")
      .set("Authorization", token);

    expect(response.status).toBe(200);
    expect(userUpdated.body[0].name).toEqual(mockedUserUpdate.name);
    expect(userUpdated.body[0]).not.toHaveProperty("password");
  });

  test("PATCH /users/:id -> Should not be able to update the user without authentication", async () => {
    const userLogin = await request(app).post("/login").send(mockedUserLogin);
    const token = `Bearer ${userLogin.body.token}`;

    const userTobeUpdateRequest = await request(app)
      .get("/users")
      .set("Authorization", token);
    const userTobeUpdateId = userTobeUpdateRequest.body[0].uuid;

    const response = await request(app)
      .patch(`/users/${userTobeUpdateId}`)
      .send(mockedUserUpdate);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /users/:id -> Should not be able to update user email", async () => {
    const userLogin = await request(app).post("/login").send(mockedUserLogin);
    const token = `Bearer ${userLogin.body.token}`;

    const userTobeUpdateRequest = await request(app)
      .get("/users")
      .set("Authorization", token);
    const userTobeUpdateId = userTobeUpdateRequest.body[0].uuid;

    const response = await request(app)
      .patch(`/users/${userTobeUpdateId}`)
      .send(mockedUserUpdateEmail)
      .set("Authorization", token);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
});
