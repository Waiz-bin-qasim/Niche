import { Router } from "express";
import {
  addJobPostBuyer,
  deleteJobPostBuyer,
  getJobPostBuyer,
  updateJobPostBuyer,
} from "../Controller/Job.Controller.js";
import { authToken } from "../Middlewares/auth.js";
import { buyerCheck, sellerCheck } from "../Middlewares/tokenValidation.js";

const JobRoutes = new Router();

// seller Routes
JobRoutes.get("/", authToken, buyerCheck, getJobPostBuyer);
JobRoutes.post("/", authToken, buyerCheck, addJobPostBuyer);
JobRoutes.put("/", authToken, buyerCheck, updateJobPostBuyer);
JobRoutes.delete("/", authToken, buyerCheck, deleteJobPostBuyer);

// buyer Routes

export default JobRoutes;
