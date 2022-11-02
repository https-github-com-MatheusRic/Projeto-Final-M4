import { Router } from "express"

const routes = Router()

export const sessionsRouter = () => {
  routes.post("/login")

  return routes
}
