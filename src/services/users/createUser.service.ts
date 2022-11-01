import { IUserCreate } from "../../interfaces/users"
import AppDataSource from "../../data-source"
import AppError from "../../errors/appError"
import { hash } from "bcryptjs"

const createUserService = async (userData: IUserCreate): Promise<User> =>{// falta importar, ainda não foi criado

    const userRepository = AppDataSource.getRepository("<userEntity>")
    const users = await userRepository.find()

    const { email, password} = userData
    const userAlreadyExist = users.find(user => user.email === email)

    if(userAlreadyExist){
        throw new AppError("Email already registred", 400)
    }
    if(!password){
        throw new AppError("Password are missing data", 400)
    }

    const hashedPassword = await hash(password, 10)
    const userCreate = userRepository.create({
        ...userData,
        password: hashedPassword
    })
    await userRepository.save(userCreate)

    return userCreate
}

export default createUserService