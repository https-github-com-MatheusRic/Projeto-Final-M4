import { Request, Response } from "express"
import updateUserService from "../../services/users/updateUser.service"
import { instanceToPlain } from 'class-transformer';

const updateUserController = async (request: Request, response: Response) => {
    const data = request.body
    const id = request.params.id
    const userUpdated = await updateUserService(data, id)

    return response.status(200).json(instanceToPlain(userUpdated))
}

export default updateUserController