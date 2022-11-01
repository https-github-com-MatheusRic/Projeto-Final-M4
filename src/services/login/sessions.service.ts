import AppDataSource from "../../data-source"
import { IUserLogin } from "../../interfaces/users"
import AppError from "../../errors/appError"
import { compare } from "bcryptjs"
import jwt from 'jsonwebtoken'
import { User } from "../../entities/user.entitie"

const createSessionService = async ({email, passworld}: IUserLogin): Promise<string> => {

    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOneBy({
        email: email
    })

    if(!user){
        throw new AppError('Invalid user or password', 403)
    }
    const passwordValidation =  await compare(passworld, user.password)
    if(!passwordValidation){
        throw new AppError('Invalid user or password', 403)
    }

    const token = jwt.sign({},
    String(process.env.SECRET_KEY),
    {
        expiresIn: '24h',
        subject: user.uuid
    })
    
    return token
}

export default createSessionService