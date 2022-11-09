import { DataSource } from "typeorm";
import request from "supertest";

import AppDataSource from "../../../data-source";
import app from "../../../app";

import { mockedCategory, mockedUser, mockedUserLogin } from "../../mocks";
import { ICategoryResponse } from "../../../interfaces/categories";

let tokenUser = "";
let categoryId = "";
let category: ICategoryResponse;

describe("GET - /categories/:uuid/", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/users").send(mockedUser);

    const resLogin = await request(app).post("/login").send(mockedUserLogin);
    tokenUser = resLogin.body.token;

    const resCreateCategory = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${tokenUser}`)
      .send(mockedCategory);

    category = resCreateCategory.body;
    categoryId = resCreateCategory.body.uuid;
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Shouldn't be possible to list a specific category without authentication", async () => {
    const errAuthUser = await request(app).get(`/categories/${categoryId}`);

    expect(errAuthUser.status).toBe(401);
    expect(errAuthUser.body).toMatchObject({
      message: "missing token",
    });
  });

  test("Shouldn't be possible to list a specific category that does not exist", async () => {
    const resListOneCategory = await request(app)
      .get("/categories/invalid_id")
      .set("Authorization", `Bearer ${tokenUser}`);

    expect(resListOneCategory.status).toBe(404);
    expect(resListOneCategory.body).toMatchObject({
      message: "Category not found",
    });
  });

  test("Should be possible to list a specific category", async () => {
    const resListOneCategory = await request(app)
      .get(`/categories/${categoryId}`)
      .set("Authorization", `Bearer ${tokenUser}`);

    expect(resListOneCategory.status).toBe(200);
    expect(resListOneCategory.body).toMatchObject(category);
  });
});
