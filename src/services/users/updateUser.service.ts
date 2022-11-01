import { hash } from "bcryptjs"
import AppDataSource from "../../data-source"
import { User } from "../../entities/user.entitie"
import AppError from "../../errors/appError"
import { IUserUpdate } from "../../interfaces/users"

const updateUserService = async (data: IUserUpdate, id: string) => {

    const userRepository = AppDataSource.getMongoRepository(User)
    const user = await userRepository.findOneBy({
        uuid: id
    })

    if(!user){
        throw new AppError ("User is not Found", 404)
    }
    if(user.email !== data.email){
        throw new AppError("You Only can uptade your own user", 400)
    }

    await userRepository.update(
        user!.uuid,
        {
            email: data.email ? data.email : user.email,
            password: data.password ? await hash(data.password , 10) : user.email,
            name: data. name ? data.name : user.name,
            username: data.username ? data.username : user.username,
            position: data.position ? data.position : user.position,
            imageUrl: data.imageUrl ? data.imageUrl : user.position
        }
    )
    
    return user
}

export default updateUserService