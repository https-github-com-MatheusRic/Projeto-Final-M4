import { Request, Response, NextFunction } from "express"

const validadeSerializerMiddleware =
  (serializer: any) => async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    try {
      await serializer.validate(req.body, {
        stripUnknown: true,
        abortEarly: false,
      })

      return next()

    } catch (error: any) {
      return res.status(400).json({
        message: error.errors
      })
    }
  }

export default validadeSerializerMiddleware;
