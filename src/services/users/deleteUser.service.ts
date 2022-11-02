import AppDataSource from "../../data-source"
import AppError from "../../errors/appError"
import { User } from "../../entities/user.entitie"


const deleteUserService = async (id: string): Promise<void> => {

    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOneBy({uuid:id})

    if(!user){
        throw new AppError("User is not found", 404)
    }

    await userRepository.delete(user)
}

export default deleteUserService