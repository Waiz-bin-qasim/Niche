import { Router } from "express";
import {
  addDirectPurchase,
  deleteDirectPurchase,
  getDirectPurchase,
  updateDirectPurchase,
} from "../Controller/DirectPurchase.Controller.js";
import { authToken } from "../Middlewares/auth.js";
import { buyerCheck, sellerCheck } from "../Middlewares/tokenValidation.js";

const DirectPurchaseRoutes = new Router();

// Add DirectPurchaseRoutes
DirectPurchaseRoutes.get("/", authToken, getDirectPurchase);
DirectPurchaseRoutes.post("/", authToken, buyerCheck, addDirectPurchase);
DirectPurchaseRoutes.put(
  "/:purchase_id",
  authToken,
  sellerCheck,
  updateDirectPurchase
);
DirectPurchaseRoutes.delete("/:purchase_id", authToken, deleteDirectPurchase);
DirectPurchaseRoutes.put(
  "/status/:purchase_id",
  authToken,
  sellerCheck,
  updateDirectPurchase
);

export default DirectPurchaseRoutes;
