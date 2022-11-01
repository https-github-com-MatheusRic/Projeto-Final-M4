import { User } from "../../entities/user.entity"
import AppDataSource from "../../data-source"
import { AppError } from "../../errors/appError"

const deleteUserService = async (id: string): Promise<Array<string | number>> => {
  const userRepository = AppDataSource.getRepository(User)

  const user = await userRepository.findOneBy({ id })
  
  if (!user) {
    throw new AppError("User not found", 404)
  }

  const isActive = user.isActive
  
  if (!isActive) {
    throw new AppError("User is already inactive", 400)
  }

  await userRepository.update(id, {
    ...user,
    isActive: false
  })

  return ['User is now inactive', 204]
}

export default deleteUserService