import { Request, Response } from "express"
import listUserService from "../../services/users/listUser.service"
import { instanceToPlain } from "class-transformer"
import listUniqueUserService from "../../services/users/listUniqueUser.service"

const listUserController = async ( response: Response) => {
    const listedUsers = await listUserService()
    return response.status(200).json(listedUsers)
}

const listUniqueUserController = async (request: Request, response: Response) => {
    const id = request.params.id
    const listedUsers = await listUniqueUserService(id)
    return response.status(200).json(instanceToPlain(listedUsers))
}

export { listUserController, listUniqueUserController }