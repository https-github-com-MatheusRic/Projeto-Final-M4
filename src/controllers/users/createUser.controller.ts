import {Request, Response} from "express"
import createUserService from "../../services/users/createUser.service"
import { instanceToPlain } from "class-transformer"


const createUserControler = async (request: Request, response: Response) => {
    const userData = request.body
    const userCreated = await createUserService(userData)
    return response.status(201).json(instanceToPlain(userCreated))
}

export default createUserControler