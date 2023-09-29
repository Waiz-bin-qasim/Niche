import { Router } from "express";
import {
  BannerPost,
  deleteBanner,
  getBannerLink,
} from "../Controller/Banner.Controller.js";

import { authToken } from "../Middlewares/auth.js";
import { adminCheck } from "../Middlewares/tokenValidation.js";
import { imageUpload } from "../Middlewares/ImageCheck.js";

const BannerRoutes = new Router();

BannerRoutes.get("/", getBannerLink);
BannerRoutes.post(
  "/upload",
  authToken,
  adminCheck,
  imageUpload("Images/banner"),
  BannerPost
);
BannerRoutes.delete("/:banner_id", authToken, adminCheck, deleteBanner);

export default BannerRoutes;
