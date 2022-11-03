import { Router } from "express"
import validadeSerializerMiddleware from "../middlewares/validateSerializer.middleware"

import createSessionController from "../controllers/login/sessions.controller"

import { sessionSerializer } from "../serializers/session.serializer"

const routes = Router()

export const sessionsRouter = () => {
  routes.post(
    "/", 
    validadeSerializerMiddleware(sessionSerializer), 
    createSessionController
  )
  
  return routes
}
