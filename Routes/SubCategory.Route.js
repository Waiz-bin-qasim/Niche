import { Router } from "express";
import { authToken } from "../Middlewares/auth.js";
import { adminCheck } from "../Middlewares/tokenValidation.js";
import {
  addSubCategory,
  deleteSubCategory,
} from "../Controller/SubCategory.Controller.js";
import { imageUpload } from "../Middlewares/ImageCheck.js";

const SubCategoryRoutes = new Router();
SubCategoryRoutes.post(
  "/",
  authToken,
  adminCheck,
  imageUpload("Images/SubCategory"),
  addSubCategory
);
SubCategoryRoutes.delete(
  "/:SubCategory_id",
  authToken,
  adminCheck,
  deleteSubCategory
);
// SubCategoryRoutes.put('/', SessionController.store);

export default SubCategoryRoutes;
