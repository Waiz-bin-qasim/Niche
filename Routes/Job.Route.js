import { Router } from "express";
import {
  addJobPostBuyer,
  deleteJobPostBuyer,
  getJobPostBuyer,
  getAllJobPostSeller,
  updateJobPostBuyer,
  getOneJobPostSeller,
} from "../Controller/Job.Controller.js";
import { authToken } from "../Middlewares/auth.js";
import { buyerCheck, sellerCheck } from "../Middlewares/tokenValidation.js";

const JobRoutes = new Router();

// buyer Routes
JobRoutes.get("/buyer", authToken, buyerCheck, getJobPostBuyer);
JobRoutes.post("/buyer", authToken, buyerCheck, addJobPostBuyer);
JobRoutes.put("/buyer/:project_id", authToken, buyerCheck, updateJobPostBuyer);
JobRoutes.delete(
  "/buyer/:project_id",
  authToken,
  buyerCheck,
  deleteJobPostBuyer
);

// seller Routes
JobRoutes.get("/seller", authToken, sellerCheck, getAllJobPostSeller);
JobRoutes.get(
  "/seller/:project_id",
  authToken,
  sellerCheck,
  getOneJobPostSeller
);

export default JobRoutes;
