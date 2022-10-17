import { Request, Response, NextFunction } from "express";

const ensureIsIDorAdmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const adm = req.user.isAdm;
  const { id } = req.params;
  const idLogado = req.user.id;

  if (adm || id === idLogado) {
    return next();
  }

  return res.status(401).json({
    message: "User is not admin or id invalid",
  });
};

export default ensureIsIDorAdmMiddleware;
