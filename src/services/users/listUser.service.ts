import AppDataSource from "../../data-source"
import { User } from "../../entities/user.entitie"

const listUserService = async (): Promise<User[]> => {
    const userRepository = AppDataSource.getRepository(User)
    const listUsers = await userRepository.find()
    return listUsers
}

export default listUserService