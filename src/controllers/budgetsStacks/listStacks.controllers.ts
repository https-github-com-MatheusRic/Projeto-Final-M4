import { Request, Response } from "express"
import listStacksServices from "../../services/budgetStacks/listStacks.services"

const listStackController = async (req: Request , res: Response) => {
    const listedStacks = await listStacksServices()

    return res.status(200).json(listedStacks)
}
export default listStackController