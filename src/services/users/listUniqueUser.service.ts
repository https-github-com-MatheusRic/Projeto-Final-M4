import AppDataSource from "../../data-source"
import { User } from "../../entities/user.entitie"
import AppError from "../../errors/appError"

const listUniqueUserService = async (id: string): Promise<User> => {
    
    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOneBy({
        uuid: id
    })
    
    if(!user){
        throw new AppError("User is not found", 404)
    }

    return user
}

export default listUniqueUserService
