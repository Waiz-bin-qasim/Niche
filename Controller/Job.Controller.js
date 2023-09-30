import { JobPost } from "../Models/JobPost.model.js";

export const addJobPostBuyer = async (req, res) => {
  const { user_id } = req.body;
  let response;
  const {
    subCategory_id,
    project_title,
    project_description,
    project_date,
    location,
    budget,
  } = req.body;
  const jobPost = new JobPost({
    subCategory_id,
    project_title,
    project_description,
    project_date,
    location,
    budget,
    buyer_id: user_id,
    created_Date: new Date(),
  });
  try {
    response = await jobPost.createAsync();
  } catch (err) {
    response = err.sqlMessage || err;
    return res.status(400).send(response);
  }
  res.send(response);
};

export const getJobPostBuyer = async (req, res) => {
  const { user_id } = req.body;
  let response;
  try {
    response = await JobPost.getBuyerProjectsAsync(user_id);
  } catch (error) {
    response = err.sqlMessage || err;
    return res.status(400).send(response);
  }
  res.send(response);
};

export const updateJobPostBuyer = async (req, res) => {};
export const deleteJobPostBuyer = async (req, res) => {};
