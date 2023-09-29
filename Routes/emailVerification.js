import { Router } from "express";
import { resendToken, verifyEmail } from "../Controller/EmailVerification.js";
import { authToken } from "../Middlewares/auth.js";

// import all controllers
// import SessionController from './app/controllers/SessionController';

const emailVerification = new Router();

// Add emailVerification
emailVerification.get("/:token", authToken, verifyEmail);
emailVerification.post("/resend", resendToken);
// emailVerification.post('/', SessionController.store);
// emailVerification.put('/', SessionController.store);
// emailVerification.delete('/', SessionController.store);

export default emailVerification;
