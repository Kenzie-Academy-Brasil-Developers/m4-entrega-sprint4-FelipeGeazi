import "reflect-metadata";
import express from "express";
import userRoutes from "./router/users.routes";
import sessionsRoutes from "./router/sessions.routes";

const app = express();
app.use(express.json());
app.use("/users", userRoutes);
app.use("/login", sessionsRoutes);

export default app;
