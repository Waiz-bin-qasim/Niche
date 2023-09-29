import { notifyStatusDirectPurchase } from "../Helper/notifyUser.js";
import { DirectServicePurchase } from "../Models/DirectServicePurchase.model.js";

export const getDirectPurchase = (req, res) => {
  const auth = req.body;
  const attribute = { [auth.role + "_id"]: auth.user_id };
  DirectServicePurchase.findById(attribute, (err, result) => {
    if (err) return res.status(400).send({ err: err.sqlMessage });
    else {
      return res.send(result);
    }
  });
};

export const addDirectPurchase = (req, res) => {};

export const updateDirectPurchase = (req, res) => {
  const { purchase_id } = req.params;
  const updates = req.body;
  const attribute = { [updates.role + "_id"]: updates.user_id };
  delete updates.role;
  delete updates.user_id;
  delete updates.status;
  delete updates.iat;
  delete updates.exp;
  delete updates.token;
  if (JSON.stringify(updates) !== "{}") {
    DirectServicePurchase.updateById(
      updates,
      attribute,
      purchase_id,
      (err, result) => {
        if (err) return res.status(400).send({ err: err.sqlMessage });
        else {
          if (result.affectedRows) {
            res.send("done");
          } else {
            res.status(400).send({ err: "Record Not Found" });
          }
        }
      }
    );
  } else {
    res.status(400).send({ err: "Empty body" });
  }
};

export const deleteDirectPurchase = (req, res) => {
  const { purchase_id } = req.params;
  const { user_id } = req.body;
  DirectServicePurchase.deleteById(purchase_id, user_id, (err, result) => {
    if (err) return res.status(400).send({ err: err.sqlMessage });
    else {
      if (result.affectedRows) {
        res.send("done");
      } else {
        res.status(400).send({ err: "Record Not Found" });
      }
    }
  });
};

export const updateStatus = async (req, res) => {
  const { purchase_id } = req.params;
  const { user_id, status } = req.body;
  let response;
  try {
    if (status === "accept") {
      response = await DirectServicePurchase.updateStatusAsync(
        purchase_id,
        user_id,
        status
      );
    } else if (status === "decline") {
      response = await DirectServicePurchase.updateStatusAsync(
        purchase_id,
        user_id,
        status
      );
      await notifyStatusDirectPurchase(purchase_id);
    } else {
      throw "No or Invalid Status Provided";
    }
  } catch (error) {
    console.log(error);
    response = error.sqlMessage || error;
    return res.status(400).send({ response });
  }
  return res.status(200).send({ response });
};
