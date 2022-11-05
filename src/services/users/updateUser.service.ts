import { hash } from "bcryptjs"
import AppDataSource from "../../data-source"
import { User } from "../../entities/user.entitie"
import AppError from "../../errors/appError"
import { IUserUpdate } from "../../interfaces/users"

const updateUserService = async (data: IUserUpdate, id: string): Promise<User | null> => {
    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOneBy({
        uuid: id
    })

    if(!user){
        throw new AppError ("User is not Found", 404)
    }
    if(user.uuid !== id){
        throw new AppError("You Only can uptade your own user", 400)
    }

    await userRepository.update(
        user!.uuid,
        {
            email: data.email ? user.email : user.email,
            password: data.password ? await hash(data.password, 10) : user.password,
            name: data.name ? data.name : user.name,
            username: data.username ? data.username : user.username,
            position: data.position ? data.position : user.position,
            imageUrl: data.imageUrl ? data.imageUrl : user.imageUrl
        }
    )
    
    const userUpdate = await userRepository.findOneBy({uuid: id})
    return userUpdate
}

export default updateUserService