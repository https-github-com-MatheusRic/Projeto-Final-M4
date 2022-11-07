import { mockedUser, mockedUserLogin } from "./../../mocks/index";
import request from "supertest";
import app from "../../../app";
import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";

let user: any;

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

    user = await request(app).post("/users").send(mockedUser);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("DELETE /users/:id -> Must be able to delete the user", async () => {
    const userLogin = await request(app).post("/login").send(mockedUserLogin);
    const token = `Bearer ${userLogin.body.token}`;

    const userToBeDeleted = await request(app)
      .get("/users")
      .set("Authorization", token);
    const userToBeDeletedId = userToBeDeleted.body[0].uuid;

    const response = await request(app)
      .delete(`/users/${userToBeDeletedId}`)
      .set("Authorization", token);

    expect(response.status).toBe(204);
  });

  test("DELETE /users/:id -> Should not be able to delete user without authentication", async () => {
    user = await request(app).post("/users").send(mockedUser);
    const userLogin = await request(app).post("/login").send(mockedUserLogin);
    const token = `Bearer ${userLogin.body.token}`;

    const userToBeDeleted = await request(app)
      .get("/users")
      .set("Authorization", token);
    const userToBeDeletedId = userToBeDeleted.body[0].uuid;

    const response = await request(app).delete(`/users/${userToBeDeletedId}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });
});
