import { Request, Response } from "express";
import updateUserService from "../../services/users/updateUser.service";
import { instanceToPlain } from "class-transformer";

const updateUserController = async (request: Request, response: Response) => {
  const data = request.body;
  if (data.hasOwnProperty("uuid") || data.hasOwnProperty("email")) {
    return response.status(400).json({
      message: "it should not be possible to pass the uuid or email field",
    });
  }
  const id = request.params.uuid;
  const userUpdated = await updateUserService(data, id);

  return response.status(200).json(instanceToPlain(userUpdated));
};

export default updateUserController;
