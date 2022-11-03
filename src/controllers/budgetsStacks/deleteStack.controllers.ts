import { Request, Response  } from "express";
import deleteStackService from "../../services/budgetStacks/deleteStack.services";

const deleteStackController = async (req: Request , res: Response) => {
    const id = req.params.id
    const stackDeleted = await deleteStackService(id)

    return res.status(200).json(stackDeleted)
}
export default deleteStackController