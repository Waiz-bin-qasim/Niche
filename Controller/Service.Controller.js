import fs from "fs";
import { Services } from "../Models/Service.model.js";
import { cleanLink } from "../Helper/cleanLink.js";
import { deleteFile } from "../Helper/deleteFile.js";
import { draftAllFieldsCheck } from "../Helper/draftCheck.js";

export const addService = (req, res) => {
  if (!req.files) {
    return res.status(400).json({ error: "No thing uploaded" });
  }
  if (!req.files[0]) {
    return res.status(400).json({ error: "No image uploaded" });
  }
  const { user_id } = req.token;
  const {
    subCategory_id,
    service_title,
    service_description,
    service_price,
    duration,
    is_featured,
  } = req.body;
  if (
    subCategory_id &&
    service_title &&
    service_description &&
    service_price &&
    duration &&
    is_featured
  ) {
    const path = cleanLink(req.files[0].path);
    const service = new Services({
      seller_id: user_id,
      service_image: path,
      subCategory_id,
      service_title,
      service_description,
      service_price,
      duration,
      is_draft: 0,
      is_featured,
    });
    service.create((err, result) => {
      if (err) {
        fs.unlink(path, (err2) => {
          if (err) {
            res.status(400).send({ error: err.sqlMessage, ...err2 });
          } else {
            res.status(400).send(err.sqlMessage);
          }
        });
      } else {
        res.status(200).json({ message: "Image Uploaded" });
      }
    });
  } else {
    res.status(400).send({ err: "invalid body" });
  }
};

export const deleteService = (req, res) => {
  try {
    const { service_id } = req.params;
    const { user_id } = req.user_id;
    if (service_id) {
      Services.findById(service_id, (err, result) => {
        if (err) res.status(400).send({ err: err.sqlMessage });
        else {
          if (result.length > 0) {
            Services.deleteById(service_id, user_id, (err, result) => {
              if (err) res.status(400).send({ err: err.sqlMessage });
              else {
                const filePath = result[0].service_image;
                fs.unlink(filePath, (err) => {
                  if (err) {
                    console.error("Error deleting the file:", err);
                  } else {
                    console.log("File deleted successfully");
                    console.log(result);
                    res.status(200).send("done");
                  }
                });
              }
            });
          } else {
            res.status(400).send({ err: "invalid service_id" });
          }
        }
      });
    } else {
      res.status(400).send({ err: "service_id Required" });
    }
  } catch (err) {
    res.status(500);
  }
};

export const getService = (req, res) => {
  const { service_id } = req.params;
  Services.findById(service_id, (err, result) => {
    if (err) return res.status(400).send({ err: err.sqlMessage });
    else {
      if (result.length > 0) {
        return res.send(result);
      } else {
        res.status(404).send({ err: "service not found" });
      }
    }
  });
};

export const getSellerService = (req, res) => {
  const { seller_id } = req.params;
  Services.findByUser(seller_id, (err, result) => {
    if (err) return res.status(400).send({ err: err.sqlMessage });
    else {
      return res.send(result);
    }
  });
};

export const getAllService = (req, res) => {
  try {
    Services.findAll((err, result) => {
      if (err) return res.status(400).send({ err: err.sqlMessage });
      else {
        res.send(result);
      }
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

export const updateService = (req, res) => {
  const updates = req.body;
  const { user_id } = req.headers;
  const { service_id } = req.params;
  if (req.files) {
    if (!req.files[0]) {
      Services.updateById(service_id, user_id, updates, (err, result) => {
        if (err) {
          res.status(400).send({ err: err.sqlMessage });
        } else {
          if (result.affectedRows) {
            res.send("done");
          } else {
            res.send(400).send({
              err: "service does not exist or you are not allowed to update",
            });
          }
        }
      });
    } else {
      const path = cleanLink(req.files[0].path);
      updates.service_image = path;
      Services.findById(service_id, (err2, result1) => {
        if (err2) {
          fs.unlink(path, (err3) => {
            if (err3)
              return res.status(400).send({ err3, err: err2.sqlMessage });
            else {
              res.status(400).send({ err2: err2.sqlMessage });
            }
          });
        } else {
          Services.updateById(service_id, user_id, updates, (err, result2) => {
            if (err) {
              fs.unlink(path, (err3) => {
                if (err3)
                  return res.status(400).send({ err3, err: err.sqlMessage });
                else {
                  res.status(400).send({ err: err.sqlMessage });
                }
              });
            } else {
              if (result2.affectedRows) {
                fs.unlink(result1[0].service_image, (err3) => {
                  if (err3) return res.status(400).send({ err3 });
                  else {
                    res.send("done");
                  }
                });
              } else {
                res.status(400).send({
                  err: "service does not exist or you are not allowed to update this service",
                });
              }
            }
          });
        }
      });
    }
  } else {
    res.status(400).send({ err: "Nothing Provided in form data" });
  }
};

export const getServiceBySubCategory = (req, res) => {
  const { subCategory_id } = req.params;
  try {
    Services.getBySubCategory(subCategory_id, (err, result) => {
      if (err) return res.status(400).send({ err: err.sqlMessage });
      else {
        return res.send(result);
      }
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

// -------------------------------
// Drafts
export const addDraft = async (req, res) => {
  const data = req.body;
  data.seller_id = req.headers.user_id;
  delete data.user_id;
  delete data.role;
  delete data.iat;
  delete data.exp;
  delete data.status;
  let response;
  console.log(req.body);
  try {
    if (req.files) {
      if (!req.files[0]) {
        response = await Services.createDraft(data);
        console.log(response);
      } else {
        data.service_image = cleanLink(req.files[0].path);
        response = await Services.createDraft(data);
        console.log(response);
      }
    } else {
      throw "Nothing to update as a draft";
    }
  } catch (error) {
    try {
      await deleteFile(req.file.path);
      console.log(error);
      response = error.sqlMessage || error.code || error;
      return res.status(400).send(response);
    } catch (error2) {
      console.log(error);
      response = error.sqlMessage || error.code || error;
      return res.status(400).send({ response });
    }
  }
  return res.send(response);
};

export const updateDraft = async (req, res) => {
  const data = req.body;
  const { service_id } = req.params;
  const seller_id = req.headers.user_id;
  delete data.user_id;
  delete data.role;
  delete data.iat;
  delete data.exp;
  delete data.status;
  let response;
  try {
    if (req.files) {
      if (req.files[0]) {
        data.service_image = cleanLink(req.files[0].path);
        const service = await Services.findDraftByIdAsync(
          service_id,
          seller_id
        );
        if (service[0].service_image) {
          await deleteFile(service[0].service_image);
        }
      }
      response = await Services.updateDraftByIdAsync(
        service_id,
        seller_id,
        data
      );
    } else {
      throw "Nothing to update";
    }
  } catch (error) {
    try {
      await deleteFile(req.file.path);
      console.log(error);
      response = error.sqlMessage || error.code || error;
      return res.status(400).send(response);
    } catch (error2) {
      console.log(error);
      response = error.sqlMessage || error.code || error;
      return res.status(400).send({ response });
    }
  }
  res.status(200).send(response);
};

export const deleteDraft = async (req, res) => {
  const { service_id } = req.params;
  const { user_id } = req.body;
  let response;
  try {
    const service = await Services.findDraftByIdAsync(service_id, user_id);
    if (service.length > 0) {
      response = await Services.deleteDraftById(service_id, user_id);
      if (service[0].service_image) {
        await deleteFile(service[0].service_image);
      }
      if (response.affectedRows !== 1) {
        throw "service Draft was not deleted ";
      }
    } else {
      throw "Unauthorize or service Draft doesn't exist ";
    }
  } catch (error) {
    console.log(error);
    response = error.sqlMessage || error.code || error;
    return res.status(400).send(response);
  }
  return res.send(response);
};

export const getOneServiceDraft = async (req, res) => {
  const { service_id } = req.params;
  const { user_id } = req.body;
  let response;
  try {
    response = await Services.getOneDraft(service_id, user_id);
  } catch (error) {
    console.log(error);
    response = error.sqlMessage || error;
    return res.status(400).send(response);
  }
  return res.status(200).send(response);
};

export const getAllServiceDraft = async (req, res) => {
  const { user_id } = req.body;
  let response;
  try {
    response = await Services.getAllDraft(user_id);
  } catch (error) {
    console.log(error);
    response = error.sqlMessage || error;
    return res.status(400).send(response);
  }
  return res.status(200).send(response);
};

export const publishServiceDraft = async (req, res) => {
  const { service_id } = req.params;
  const { user_id } = req.body;
  let response;
  try {
    const service = await Services.findDraftByIdAsync(service_id, user_id);
    console.log(service);
    if (service[0] && draftAllFieldsCheck(service[0])) {
      response = await Services.publishDraft(service_id, user_id);
    } else {
      throw "Draft incomplete or doesn't exist ";
    }
  } catch (error) {
    console.log(error);
    response = error.sqlMessage || error;
    return res.status(400).send(response);
  }
  return res.status(200).send(response);
};

// _______________________BST SELLING SERVICE________________

export const getBestSellingServices = async (req, res) => {
  let response;
  try {
    response = await Services.getAllBestServiceAsync();
    if (!response || response.length === 0) {
      throw "No services Available";
    }
  } catch (error) {
    console.log(error);
    response = error.sqlMessage || error;
    return res.status(400).send(response);
  }
  return res.status(200).send(response);
};
