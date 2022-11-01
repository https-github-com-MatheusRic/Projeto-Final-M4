import AppDataSource from "../../data-source"
import AppError from "../../errors/appError"

const listUniqueUserService = async (id: string) => {
    
    const userRepository = AppDataSource.getRepository("<user>")
    const user = userRepository.findOneBy({
        id:id
    })
    if(!user){
        throw new AppError("User is not found", 404)
    }

    return user
}

export default listUniqueUserService
