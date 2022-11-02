import { Request, Response, NextFunction } from "express";

const validadeSerializerMiddleware =
  (serializer: any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validateBody = await serializer.validate(req.body, {
        stripUnknown: true,
        abortEarly: false,
      });

      req.validateBody = validateBody;

      console.log(validateBody)

      return next();
    } catch (error) {
      return res.status(400).json();
    }
  };

export default validadeSerializerMiddleware;
