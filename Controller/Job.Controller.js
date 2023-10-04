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
  const dateObject = new Date(data.project_date);
  try {
    if (dateObject > new Date()) {
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
      response = await jobPost.createAsync();
    } else {
      throw "Invalid project Date";
    }
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

export const updateJobPostBuyer = async (req, res) => {
  const { project_id } = req.params;
  const { user_id } = req.body;
  const data = req.body;
  delete data.user_id;
  delete data.role;
  delete data.iat;
  delete data.exp;
  delete data.status;
  delete data.project_id;
  delete data.location;
  delete data.created_date;
  let response;
  const dateObject = new Date(data.project_date);
  try {
    if (data.project_date && dateObject <= new Date()) {
      throw "Invalid project Date";
    }
    response = await JobPost.updateProjectByIdAsync(project_id, user_id, data);
  } catch (err) {
    response = err.sqlMessage || err;
    return res.status(400).send(response);
  }
  res.send(response);
};

export const deleteJobPostBuyer = async (req, res) => {
  const { project_id } = req.params;
  const { user_id } = req.body;
  let response;
  const currentDate = new Date();
  const twoDaysLater = new Date();
  twoDaysLater.setDate(currentDate.getDate() + 2);
  try {
    const data = await JobPost.getProjectDateByIdAsync(project_id, user_id);
    const dateObject = new Date(data[0].project_date);
    if (dateObject <= twoDaysLater) {
      throw "Cannot delete project less time left";
    }
    response = await JobPost.deleteProjectByIdAsync(project_id, user_id);
  } catch (err) {
    console.log(err);
    response = err.sqlMessage || err;
    return res.status(400).send(response);
  }
  res.send(response);
};

export const getAllJobPostSeller = async (req, res) => {
  let response;
  try {
    response = await JobPost.getAllProjectsSellerAsync();
  } catch (err) {
    console.log(err);
    response = err.sqlMessage || err;
    return res.status(400).send(response);
  }
  res.send(response);
};

export const getOneJobPostSeller = async (req, res) => {
  const { project_id } = req.params;
  let response;
  try {
    response = await JobPost.getOneProjectsSellerByIdAsync(project_id);
  } catch (err) {
    console.log(err);
    response = err.sqlMessage || err;
    return res.status(400).send(response);
  }
  res.send(response);
};
