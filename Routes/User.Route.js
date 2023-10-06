import { Router } from "express";
import {
  addCard,
  getCard,
  getStatus,
  resetPassword,
  resetPasswordReq,
  verification,
} from "../Controller/User.controller.js";
import { authToken } from "../Middlewares/auth.js";
import { resetPasswordCheck } from "../Middlewares/tokenValidation.js";
import { imageUpload } from "../Middlewares/ImageCheck.js";

// import all controllers
// import SessionController from './app/controllers/SessionController';

const UserRoute = new Router();

// Add UserRoute
UserRoute.get("/resetpassword", resetPasswordReq);
UserRoute.post("/resetpassword", authToken, resetPasswordCheck, resetPassword);
UserRoute.get("/status", authToken, getStatus);
UserRoute.post(
  "/verification",
  authToken,
  imageUpload("Images/Status_Verification"),
  verification
);
UserRoute.post("/card", authToken, addCard);
UserRoute.get("/card", authToken, getCard);

export default UserRoute;
