import { mockedUserLogin } from "./../../mocks/index";
import { DataSource } from "typeorm";
import request from "supertest";

import AppDataSource from "../../../data-source";
import app from "../../../app";

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
  });

  afterAll(async () => {
    await connection.destroy();
  });
});

test("should not be able to update user without authentication", async () => {
  const adminLoginResponse = await request(app)
    .post("/login")
    .send(mockedUserLogin);
  const userTobeUpdate = await request(app)
    .get("/users")
    .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
  const response = await request(app).patch(
    `/users/${userTobeUpdate.body[0].id}`
  );

  expect(response.body).toHaveProperty("message");
  expect(response.status).toBe(401);
});

test("should not be able to update user with invalid id", async () => {
  const newValues = { name: "Matheus Ricardo", email: "matheus@mail.com" };

  const admingLoginResponse = await request(app)
    .post("/login")
    .send(mockedUserLogin);
  const token = `Bearer ${admingLoginResponse.body.token}`;

  const userTobeUpdateRequest = await request(app)
    .get("/users")
    .set("Authorization", token);
  const userTobeUpdateId = userTobeUpdateRequest.body[0].id;

  const response = await request(app)
    .patch(`/users/13970660-5dbe-423a-9a9d-5c23b37943cf`)
    .set("Authorization", token)
    .send(newValues);

  expect(response.body).toHaveProperty("message");
  expect(response.status).toBe(404);
});

test("should not be able to update id field value", async () => {
  const newValues = { id: false };

  const admingLoginResponse = await request(app)
    .post("/login")
    .send(mockedUserLogin);
  const token = `Bearer ${admingLoginResponse.body.token}`;

  const userTobeUpdateRequest = await request(app)
    .get("/users")
    .set("Authorization", token);
  const userTobeUpdateId = userTobeUpdateRequest.body[0].id;

  const response = await request(app)
    .patch(`/users/${userTobeUpdateId}`)
    .set("Authorization", token)
    .send(newValues);
  expect(response.body).toHaveProperty("message");
  expect(response.status).toBe(401);
});

test("PATCH /users/:id -  should be able to update user", async () => {
  const newValues = { name: "Matheus Ricardo", email: "matheus@mail.com" };

  const admingLoginResponse = await request(app)
    .post("/login")
    .send(mockedUserLogin);
  const token = `Bearer ${admingLoginResponse.body.token}`;

  const userTobeUpdateRequest = await request(app)
    .get("/users")
    .set("Authorization", token);
  const userTobeUpdateId = userTobeUpdateRequest.body[0].id;

  const response = await request(app)
    .patch(`/users/${userTobeUpdateId}`)
    .set("Authorization", token)
    .send(newValues);

  const userUpdated = await request(app)
    .get("/users")
    .set("Authorization", token);

  expect(response.status).toBe(200);
  expect(userUpdated.body[0].name).toEqual("Matheus Ricardo");
  expect(userUpdated.body[0]).not.toHaveProperty("password");
});
