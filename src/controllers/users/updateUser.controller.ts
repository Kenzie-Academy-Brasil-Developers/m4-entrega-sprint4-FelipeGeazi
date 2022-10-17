import { IUserUpdate } from "./../../interfaces/users/index";
import { Request, Response } from "express";
import updateUserService from "../../services/users/updateUser.service";
import { User } from "../../entities/user.entity";

const updateUserController = async (req: Request, res: Response) => {
  try {
    const user: IUserUpdate = req.body;
    const id: string = req.params.id;
    const updatedUser = await updateUserService(user, id);

    console.log(updatedUser);
    if (updatedUser instanceof User) {
      return res.json({ message: updatedUser });
    }
    console.log(updatedUser[1]);

    return res.status(updatedUser[1] as number).json({
      message: updatedUser[0],
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

export default updateUserController;
