import { Router } from "express";
import { User_Login, adminLogin } from "../Controller/login.controller.js";

// import all controllers
// import SessionController from './app/controllers/SessionController';

const LoginRoute = new Router();

// Add LoginRoute
LoginRoute.post("/user", User_Login);
LoginRoute.post("/admin", adminLogin);
// LoginRoute.get('/', SessionController.store);
// LoginRoute.put('/', SessionController.store);
// LoginRoute.delete('/', SessionController.store);

export default LoginRoute;
