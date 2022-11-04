import { Request, Response  } from "express"
import deleteStackService from "../../services/budgetStacks/deleteStack.services"

const deleteStackController = async (req: Request , res: Response) => {
    const id = req.params.uuid
    await deleteStackService(id)

    return res.status(204).send()
}
export default deleteStackController