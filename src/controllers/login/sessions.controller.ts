import { Request, Response } from "express"
import createSessionService from "../../services/login/sessions.service"


const createSessionController = async (request: Request, response: Response) => {
    
    const user = request.body
    
    const token = await createSessionService(user)
    return response.status(200).json({token})
    
}

export default createSessionController