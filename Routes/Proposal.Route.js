import { Router } from "express";
import {
  addProposal,
  deleteProposal,
  getAllBuyerProposal,
  getAllProposalByProjectId,
  getAllSellerProposal,
  getOneBuyerProposal,
  getOneSellerProposal,
  updateProposal,
} from "../Controller/Proposal.Controller.js";
import { authToken } from "../Middlewares/auth.js";
import { buyerCheck, sellerCheck } from "../Middlewares/tokenValidation.js";

const ProposalRoutes = new Router();

// Routes For buyer
ProposalRoutes.get('/buyer',authToken,buyerCheck,getAllBuyerProposal );
ProposalRoutes.get("/buyer/:proposal_id", authToken, buyerCheck, getOneBuyerProposal);
ProposalRoutes.get("/project/:project_id", authToken, buyerCheck, getAllProposalByProjectId);

// Routes For seller
ProposalRoutes.put("/:proposal_id", authToken, sellerCheck, updateProposal);
ProposalRoutes.delete("/:proposal_id", authToken, sellerCheck, deleteProposal);
ProposalRoutes.post("/", authToken, sellerCheck, addProposal);
ProposalRoutes.get("/seller", authToken, sellerCheck, getAllSellerProposal);
// correct this
ProposalRoutes.get("/seller/:project_id", authToken, sellerCheck, getOneSellerProposal);

export default ProposalRoutes;
