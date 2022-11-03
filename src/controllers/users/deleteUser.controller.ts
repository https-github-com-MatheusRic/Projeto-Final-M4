import { Request, Response } from "express"
import deleteUserService from "../../services/users/deleteUser.service"

const deleteUserController = async (request: Request, response: Response) => {
    const id = request.params.uuid
    const userDeleted = await deleteUserService(id)

    return response.status(204).json({message: userDeleted})
}

export default deleteUserController