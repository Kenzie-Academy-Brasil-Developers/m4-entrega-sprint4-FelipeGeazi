import { Router } from "express";
import createSessionsController from "../controllers/sessions/createSessions.controller";

const sessionsRoutes = Router();

sessionsRoutes.post("", createSessionsController);

export default sessionsRoutes;
