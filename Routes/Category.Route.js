import { Router } from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategory,
  getCategory,
} from "../Controller/Category.Controller.js";
import { authToken } from "../Middlewares/auth.js";
import { adminCheck, sellerCheck } from "../Middlewares/tokenValidation.js";
import { imageUpload } from "../Middlewares/ImageCheck.js";

const CategoryRoutes = new Router();

CategoryRoutes.get("/", getAllCategory);
CategoryRoutes.get("/:category_id", getCategory);
CategoryRoutes.post(
  "/",
  authToken,
  adminCheck,
  imageUpload("Images/Categories"),
  addCategory
);
CategoryRoutes.delete("/:category_id", authToken, adminCheck, deleteCategory);

export default CategoryRoutes;
