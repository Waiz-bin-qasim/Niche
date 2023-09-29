import { Proposal } from "../Models/Proposal.model.js";

// controller for buyer
export const getAllBuyerProposal = async (req, res) => {
  const { user_id } = req.body;
  let response;
  try {
    response = await Proposal.getAllBuyerProposalsByIdAsync(user_id);
    if (!response || response.length === 0) throw "No Proposals Found";
  } catch (error) {
    response = error.sqlMessage || error;
    return res.status(400).send(response);
  }
  return res.status(200).send(response);
};

export const getOneBuyerProposal = async (req, res) => {
  const { user_id } = req.body;
  const { proposal_id } = req.params;
  let response;
  try {
    response = await Proposal.getAllBuyerProposalsByIdAsync(
      user_id,
      proposal_id
    );
    if (!response || response.length === 0) throw "No Proposals Found";
  } catch (error) {
    response = error.sqlMessage || error;
    return res.status(400).send(response);
  }
  return res.status(200).send(response);
};

export const addProposal = async (req, res) => {
  const { buyer_id, project_id, proposal_amount, proposal_id, user_id } =
    req.body;
  let response;
  try {
    if (buyer_id && project_id && proposal_amount && proposal_id && user_id) {
      const proposal = new Proposal({
        buyer_id,
        project_id,
        proposal_amount,
        proposal_id,
        seller_id: user_id,
        proposal_date: new Date(),
      });
      response = await proposal.createAsync();
    } else {
      throw "Incomplete Body";
    }
  } catch (error) {
    console.log(error);
    error = error.sqlMessage;
    return res.status(400).send(error);
  }
  return res.status(200).send(response);
};

export const updateProposal = (req, res) => {
  let response;
  try {
  } catch (error) {}
};

//  controller for seller
export const getAllProposalByProjectId = async (req, res) => {
  const { user_id } = req.body;
  const { project_id } = req.params;
  let response;
  try {
    response = await Proposal.getAllProposalByProjectIdAsync(
      project_id,
      user_id
    );
    if (!response || response.length === 0) throw "No Proposals Found";
  } catch (error) {
    response = error.sqlMessage || error;
    return res.status(400).send(response);
  }
  return res.status(200).send(response);
};

export const getOneSellerProposal = async (req, res) => {
  const { user_id } = req.body;
  const { proposal_id } = req.params;
  let response;
  try {
    response = await Proposal.getOneSellerProposal(user_id, proposal_id);
    if (!response || response === 0) throw "No Proposal was Found";
  } catch (error) {
    response = error.sqlMessage || error;
    return res.status(400).send(response);
  }
  return res.status(200).send(response);
};

export const getAllSellerProposal = async (req, res) => {
  const { user_id } = req.body;
  let response;
  try {
    response = await Proposal.getSellerProposals(user_id);
    if (!response || response.length === 0) throw "No Proposals Found";
  } catch (error) {
    console.log(error);
    error = error.sqlMessage;
    return res.status(400).send(error);
  }
  return res.status(200).send(response);
};
export const deleteProposal = async (req, res) => {};
