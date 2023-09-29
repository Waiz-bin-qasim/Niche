import { Router } from "express";
import { authToken } from "../Middlewares/auth.js";
import { adminCheck, sellerCheck } from "../Middlewares/tokenValidation.js";
import {
  allSellers,
  getDashboard,
  getProfile,
  updateProfile,
  viewProfile,
} from "../Controller/Seller.Controller.js";
import { imageUpload } from "../Middlewares/ImageCheck.js";

// import all controllers
// import SessionController from './app/controllers/SessionController';

const sellerRoutes = new Router();

// Add sellerRoutes

sellerRoutes.get("/getall", authToken, adminCheck, allSellers);
sellerRoutes.get("/viewprofile", authToken, sellerCheck, viewProfile);
sellerRoutes.get("/getprofile/:seller_id", getProfile);
sellerRoutes.put(
  "/updateprofile",
  authToken,
  sellerCheck,
  imageUpload("Images/Seller"),
  updateProfile
);
sellerRoutes.get("/dashboard", authToken, sellerCheck, getDashboard);
// sellerRoutes.post('/', SessionController.store);
// sellerRoutes.put('/', SessionController.store);
// sellerRoutes.delete('/', SessionController.store);

export default sellerRoutes;
