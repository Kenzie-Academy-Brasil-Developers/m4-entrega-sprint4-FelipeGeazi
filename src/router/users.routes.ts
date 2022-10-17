import { Router } from "express";
import createUserController from "../controllers/users/createUser.controller";
import deleteUserController from "../controllers/users/deleteUser.controller";
import listUsersController from "../controllers/users/listUsers.controller";
import updateUserController from "../controllers/users/updateUser.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middlewares";
import ensureIsAdmMiddleware from "../middlewares/isAdmAuth.middlewares";
import ensureIsIDorAdmMiddleware from "../middlewares/isIDorAdm.middlewares";
const userRoutes = Router();

userRoutes.post("", createUserController);
userRoutes.get(
  "",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  listUsersController
);
userRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureIsIDorAdmMiddleware,
  updateUserController
);

userRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureIsIDorAdmMiddleware,
  ensureIsAdmMiddleware,
  deleteUserController
);
export default userRoutes;
