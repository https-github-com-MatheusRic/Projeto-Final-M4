import AppDataSource from "../../data-source"

const listUserService = async () => {
    const userRepository = AppDataSource.getRepository("<user>")
    const listUsers = await userRepository.find()
    return listUsers
}

export default listUserService