import { mockedUserLogin, mockedUser } from "./../../mocks/index";
import { DataSource } from "typeorm";
import request from "supertest";

import AppDataSource from "../../../data-source";
import app from "../../../app";

describe("DELETE - /users/", () => {
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

test("should not be able to delete user without authentication", async () => {
  const adminLoginResponse = await request(app)
    .post("/login")
    .send(mockedUserLogin);
  const UserTobeDeleted = await request(app)
    .get("/users")
    .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

  const response = await request(app).delete(
    `/users/${UserTobeDeleted.body[0].id}`
  );

  expect(response.body).toHaveProperty("message");
  expect(response.status).toBe(401);
});

test("should not be able to delete user with invalid id", async () => {
  await request(app).post("/users").send(mockedUser);

  const adminLoginResponse = await request(app)
    .post("/login")
    .send(mockedUserLogin);

  const response = await request(app)
    .delete(`/users/13970660-5dbe-423a-9a9d-5c23b37943cf`)
    .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
  expect(response.status).toBe(404);
  expect(response.body).toHaveProperty("message");
});
