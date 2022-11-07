import { DataSource } from "typeorm";
import "dotenv/config";

const AppDataSource = new DataSource(
  process.env.NODE_ENV === "test"
    ? {
        type: "sqlite",
        database: ":memory:",
        entities: ["src/entities/*.ts"],
        synchronize: true,
      }
    : {
        type: "postgres",
        
        ssl: process.env.NODE_ENV === "production" ? {rejectUnauthorized: false} : false,
        logging: true,
        synchronize: false,

        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        host: process.env.HOST,
        database: process.env.POSTGRES_DB,

        entities: process.env.NODE_ENV === "production" ? ["dist/entities/*.js"] : ["src/entities/*.ts"],
        migrations: process.env.NODE_ENV === "production" ? ["dist/migrations/*.js"] : ["src/migrations/*.ts"],
      }
);

export default AppDataSource;
