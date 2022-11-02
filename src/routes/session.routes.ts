import { Router } from "express"
import createSessionController from "../controllers/login/sessions.controller"

const routes = Router()

export const sessionsRouter = () => {
  routes.post("/login", createSessionController)
  
  return routes
}
