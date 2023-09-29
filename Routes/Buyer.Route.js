import { Router } from "express";
import {
  getProfile,
  updateProfile,
  viewProfile,
} from "../Controller/Buyer.Controller.js";
import { authToken } from "../Middlewares/auth.js";
import { buyerCheck } from "../Middlewares/tokenValidation.js";
import { imageUpload } from "../Middlewares/ImageCheck.js";

// import all controllers
// import SessionController from './app/controllers/SessionController';

const buyerRoutes = new Router();

// Add buyerRoutes
buyerRoutes.get("/getprofile/:buyer_id", getProfile);
buyerRoutes.get("/viewprofile", authToken, buyerCheck, viewProfile);
buyerRoutes.put(
  "/updateprofile",
  authToken,
  buyerCheck,
  imageUpload("Images/Buyer"),
  updateProfile
);

// buyerRoutes.put('/', SessionController.store);
// buyerRoutes.delete('/', SessionController.store);

export default buyerRoutes;
