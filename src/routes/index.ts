import { Express } from "express"

import { usersRouter } from "./users.routes"
import { sessionsRouter } from "./session.routes"
import { costumersRouter } from "./customers.routes"
import { budgetsRouter } from "./budgets.routes"
import { stacksRouter } from "./stacks.routes"
import { categoriesRouter } from "./categories.routes"

export const appRoutes = (app: Express) => {
  app.use("/users", usersRouter())
  app.use("/login", sessionsRouter())
  app.use("/customers", costumersRouter())
  app.use("/budgets", budgetsRouter())
  app.use("/stacks", stacksRouter())
  app.use("/categories", categoriesRouter())
}
