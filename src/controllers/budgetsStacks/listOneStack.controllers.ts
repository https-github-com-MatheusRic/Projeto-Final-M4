import { Request, Response  } from "express"
import listOneStackService from "../../services/budgetStacks/listOneStack.services"

const listOneStackController = async (req: Request , res: Response) => {
    const id = req.params.uuid
    const listedStack = await listOneStackService(id)

    return res.status(200).json(listedStack)
}
export default listOneStackController