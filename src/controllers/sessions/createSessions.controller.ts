import { Request, Response } from "express";
import { IUserLogin } from "../../interfaces/users";
import createSessionService from "../../services/sessions/createSessions.service";

const createSessionsController = async (req: Request, res: Response) => {
  try {
    const data: IUserLogin = req.body;
    const token = await createSessionService(data);
    return res.json({ token });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(403).json({ message: err.message });
    }
  }
};

export default createSessionsController;
