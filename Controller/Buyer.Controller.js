import { cleanLink } from "../Helper/cleanLink.js";
import { Buyer } from "../Models/Buyer.model.js";
import { User } from "../Models/User.model.js";
import fs from "fs";

export const viewProfile = (req, res) => {
  const { user_id } = req.body;
  User.findById(user_id, (err, result) => {
    if (err) return res.status(400).send({ err: err.sqlMessage });
    else {
      delete result[0].password;
      delete result[0].is_online;
      delete result[0].is_verified;
      delete result[0].status;
      return res.send(result);
    }
  });
};

export const updateProfile = (req, res) => {
  const updates = req.body;
  const { user_id } = req.headers;
  if (req.files) {
    if (!req.files[0]) {
      User.updateById(user_id, updates, (err, result) => {
        if (err) return res.status(400).send({ err: err });
        else {
          return res.status(200).send("done");
        }
      });
    } else {
      const path = cleanLink(req.files[0].path);
      updates.profile_picture = path;
      User.findById(user_id, (err, result1) => {
        if (err) {
          fs.unlink(path, (err3) => {
            if (err3)
              return res.status(400).send({ err3, err: err.sqlMessage });
            else {
              return res.status(400).send({ err: err.sqlMessage });
            }
          });
        } else {
          User.updateById(user_id, updates, (err2, result2) => {
            if (err2) {
              fs.unlink(path, (err3) => {
                if (err3) return res.status(400).send({ err3 });
                else {
                  return res.status(400).send({ err: err2.sqlMessage });
                }
              });
            } else {
              if (result2.affectedRows) {
                fs.unlink(result1[0].profile_picture, (err3) => {
                  if (err3) return res.status(400).send({ err3 });
                  else {
                    res.send("done");
                  }
                });
              } else {
                res.status(400).send({ err: "update can not be done" });
              }
            }
          });
        }
      });
    }
  } else {
    res.send("Nothing Provided in form data");
  }
};

export const getProfile = async (req, res) => {};

// export const getProfile = (req, res) => {
//   const { buyer_id } = req.params;
//   Buyer.
// };
