import { Router } from "express";
import { User_Signup } from "../Controller/Signup.controller.js";
// import all controllers
// import SessionController from './app/controllers/SessionController';

const SignUp = new Router();

// Add SignUp
SignUp.post("/user", User_Signup);
// SignUp.get('/', SessionController.store);
// SignUp.put('/', SessionController.store);
// SignUp.delete('/', SessionController.store);

export default SignUp;
