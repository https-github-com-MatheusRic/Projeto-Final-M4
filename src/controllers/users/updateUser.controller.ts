import { Request, Response } from "express"
import updateUserService from "../../services/users/updateUser.service"

const updateUserController = async (request: Request, response: Response) => {
    const data = request.body
    const id = request.params.id
    const userUpdated = await updateUserService(data, id)
    const { password, ...userResponse} = userUpdated
    return response.status(200).json(userResponse)
}

export default updateUserController