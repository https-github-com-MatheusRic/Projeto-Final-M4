import { mockedUserLogin, mockedUser } from "./../../mocks/index";
import request from "supertest";
import app from "../../../app";
import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";

describe("POST - /login/", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((error) => {
        console.log(error);
      });

    await request(app).post("/users").send(mockedUser);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /login -> Deve ser capaz de fazer login do usuario", async () => {
    const result = await request(app).post("/login").send(mockedUserLogin);

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("token");
  });

  test("POST /login -> Nao deve ser possivel fazer login com um usuario inexistente", async () => {
    const result = await request(app)
      .post("/login")
      .send({ email: "teste@teste.com.br", password: "123456789" });

    expect(result.status).toBe(403);
    expect(result.body).toHaveProperty("message");
  });
});
