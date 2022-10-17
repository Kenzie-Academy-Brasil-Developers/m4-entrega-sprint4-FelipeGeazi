import { Request, Response } from "express";
import listUsersService from "../../services/users/listUsers.service";
import { instanceToPlain } from "class-transformer";

const listUsersController = async (req: Request, res: Response) => {
  try {
    const users = await listUsersService();

    return res.json(instanceToPlain(users));
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        error: error.name,
        message: error.message,
      });
    }
  }
};

export default listUsersController;
