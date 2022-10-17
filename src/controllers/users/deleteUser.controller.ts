import { IUserUpdate } from "./../../interfaces/users/index";
import { Request, Response } from "express";
import deleteUserService from "../../services/users/deleteUser.service";
import { User } from "../../entities/user.entity";

const deleteUserController = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const deleteUser = await deleteUserService(id);

    if (deleteUser instanceof User) {
      return res.status(204).json({ message: deleteUser });
    }

    return res.status(deleteUser[1] as number).json({
      message: deleteUser[0],
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        error: error.name,
        message: error.message,
      });
    }
  }
};

export default deleteUserController;
