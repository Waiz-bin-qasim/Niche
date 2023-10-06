import { json } from "express";
import { Proposal } from "../Models/Proposal.model.js";
import { sellerLevel } from "../Helper/sellerDashboard.Helper.js";

// controller for seller
export const getAllBuyerProposal = async (req, res) => {
  const { user_id } = req.body;
  let response;
  try {
    response = await Proposal.getAllBuyerProposalsByIdAsync(user_id);
    if (!response || response.length === 0) throw "No Proposals Found";
  } catch (error) {
    console.log(error);
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
    let i = 0;
    for (let value of response) {
      console.log(value);
      response[i].proposal_data = JSON.parse(value.proposal_data);
      i++;
    }
  } catch (error) {
    console.log(error);
    response = error.sqlMessage || error;
    return res.status(400).send(response);
  }
  return res.status(200).send(response);
};

export const addProposal = async (req, res) => {
  const { buyer_id, project_id, proposal_amount, user_id, proposal_data } =
    req.body;
  let response;
  try {
    const proposal_data_json = JSON.stringify(proposal_data);
    if (buyer_id && project_id && proposal_amount && user_id && proposal_data) {
      const proposal = new Proposal({
        buyer_id,
        project_id,
        proposal_amount,
        proposal_data: proposal_data_json,
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

export const updateProposal = async (req, res) => {
  const { proposal_id } = req.params;
  const { user_id } = req.body;
  const data = req.body;
  delete data.user_id;
  delete data.role;
  delete data.iat;
  delete data.exp;
  delete data.status;
  delete data.project_id;
  delete data.buyer_id;
  delete data.proposal_date;
  delete data.seller_id;
  delete data.proposal_id;
  let response;
  try {
    if (Object.keys(data).length <= 0) {
      throw "Nothing to update";
    }
    response = await Proposal.updateProposalByIdAsync(
      proposal_id,
      user_id,
      data
    );
    if (response.affectedRows === 0) {
      throw "Proposal does not exist ";
    }
  } catch (error) {
    console.log(error);
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

export const deleteProposal = async (req, res) => {
  const { proposal_id } = req.params;
  const { user_id } = req.body;
  let response;
  try {
    response = await Proposal.deleteProposalByIdAsync(user_id, proposal_id);
    if (response.affectedRows === 0) {
      throw "Proposal does not exist ";
    }
  } catch (error) {
    console.log(error);
    response = error.sqlMessage || error;
    return res.status(400).send(response);
  }
  return res.status(200).send(response);
};

//  controller for buyer
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
    let i = 0;
    for (let value of response) {
      response[i].proposal_data = JSON.parse(value.proposal_data);
      response[i].level = sellerLevel(value.total_earning);
      i++;
    }
  } catch (error) {
    console.log(error);
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
    response = await Proposal.getBuyerProposalByIdAsync(user_id, proposal_id);
    if (!response || response.length === 0) throw "No Proposals Found";
    let i = 0;
    for (let value of response) {
      response[i].proposal_data = JSON.parse(value.proposal_data);
      response[i].level = sellerLevel(value.total_earning);
      i++;
    }
  } catch (error) {
    console.log(error);
    response = error.sqlMessage || error;
    return res.status(400).send(response);
  }
  return res.status(200).send(response);
};
