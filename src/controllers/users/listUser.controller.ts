import { Response } from "express"
import listUserService from "../../services/users/listUser.service"
import { instanceToPlain } from "class-transformer"

const listUserController = async ( response: Response) => {
    const listedUsers = await listUserService()
    return response.status(200).json(instanceToPlain(listedUsers))
}

export default listUserController