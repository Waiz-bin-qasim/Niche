import { Router } from "express";
import {
  addDraft,
  addService,
  deleteDraft,
  deleteService,
  getAllService,
  getAllServiceDraft,
  getBestSellingServices,
  getOneServiceDraft,
  getSellerService,
  getService,
  getServiceBySubCategory,
  publishServiceDraft,
  updateDraft,
  updateService,
} from "../Controller/Service.Controller.js";
import { authToken } from "../Middlewares/auth.js";
import { sellerCheck } from "../Middlewares/tokenValidation.js";
import { imageUpload } from "../Middlewares/ImageCheck.js";

// import all controllers
// import SessionController from './app/controllers/SessionController';

const serviceRoute = new Router();

// Add serviceRoute
serviceRoute.get("/", getAllService);
serviceRoute.get("/subCategory/:subCategory", getServiceBySubCategory);
serviceRoute.get("/:service_id", getService);
serviceRoute.get("/seller/:seller_id", getSellerService);
serviceRoute.delete("/waiz/:service_id", authToken, sellerCheck, deleteService);
serviceRoute.post(
  "/",
  authToken,
  sellerCheck,
  imageUpload("Images/service"),
  addService
);

serviceRoute.put(
  "/:service_id",
  authToken,
  sellerCheck,
  imageUpload("Images/service"),
  updateService
);

// ------------------------------------
// Drafts
serviceRoute.post(
  "/draft",
  authToken,
  sellerCheck,
  imageUpload("Images/service"),
  addDraft
);
serviceRoute.put(
  "/draft/:service_id",
  authToken,
  sellerCheck,
  imageUpload("Images/service"),
  updateDraft
);
serviceRoute.delete("/draft/:service_id", authToken, sellerCheck, deleteDraft);
serviceRoute.get(
  "/draft/one/:service_id",
  authToken,
  sellerCheck,
  getOneServiceDraft
);
serviceRoute.get("/draft/all", authToken, sellerCheck, getAllServiceDraft);

serviceRoute.post(
  "/draft/publish/:service_id",
  authToken,
  sellerCheck,
  publishServiceDraft
);

// _________BEST SELLING SERVICE_________
serviceRoute.get("/bestselling", getBestSellingServices);

export default serviceRoute;
