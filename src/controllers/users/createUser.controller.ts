import createUserService from "../../services/users/createUser.service";
import { instanceToPlain } from "class-transformer";

import { Request, Response } from "express";

const createUserController = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const createUser = await createUserService(user);
    return res.status(201).json(instanceToPlain(createUser));
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        error: error.name,
        message: error.message,
      });
    }
  }
};
export default createUserController;
