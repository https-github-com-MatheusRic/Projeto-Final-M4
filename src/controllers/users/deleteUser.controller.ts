import { Request, Response } from "express"
import deleteUserService from "../../services/users/deleteUser.service"

const deleteUserController = async (request: Request, response: Response) => {
    const id = request.params.id
    const userDeleted = deleteUserService(id)
}

export default deleteUserController