import { Application, NextFunction, Request, Response, Router } from "express";
import { UsersController } from "../interfaces/controllers/UsersController";
import { firestoreCollection } from "./FirestoreConnection";

const usersController = new UsersController(firestoreCollection("users"));

let router = Router();

// ============
// Health Check
// ============
// app.get('/', await healthCheckController.healthCheck);
router.get("/", (req: Request, res: Response) => res.send("Helloooo"));

// ============
// Users
// ============
// app.post(  '/v1/oauth2/token',                                              await userController.auth);
router.get("/users", usersController.findAllUsers);
router.post("/users", usersController.createUser);
router.get("/users/:id", usersController.findUser);
router.put("/users/:id", usersController.updateUser);
// app.get(   '/v1/teams/:teamId/users/:userId',                               await userController.findOne); // 元 app.get(   '/v1/users/:id',                                   await userController.findOne);
// app.put(   '/v1/teams/:teamId/users/:userId',                               await userController.update); // 元 app.put(   '/v1/users/:id',                                   await userController.update);
// app.delete('/v1/teams/:teamId/users/:userId',                               await userController.remove); // 元 app.delete('/v1/users/:id',                                   await userController.remove);

export default router;
