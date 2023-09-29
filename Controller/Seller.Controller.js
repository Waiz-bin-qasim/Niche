import { cleanLink } from "../Helper/cleanLink.js";
import {
  sellerAvgRating,
  sellerLevel,
} from "../Helper/sellerDashboard.Helper.js";
import { Review } from "../Models/Reviews.model.js";
import { Seller } from "../Models/Seller.model.js";
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

export const getProfile = (req, res) => {
  const { seller_id } = req.params;
  Seller.getSellerProfile(seller_id, (err, result) => {
    if (err) return res.status(400).send({ err: err });
    else {
      return res.send(result);
    }
  });
};

export const allSellers = (req, res) => {
  Seller.getAllSeller((err, result) => {
    if (err) return res.status(400).send({ err: err.sqlMessage });
    else {
      return res.send(result);
    }
  });
};

export const getDashboard = async (req, res) => {
  const { user_id } = req.body;
  let response;
  try {
    response = await Seller.getSellerAsync(user_id);
    if (response.length > 0) {
      const [avgRating, reviews] = await Promise.all([
        sellerAvgRating(user_id),
        Review.getSellerReviews(user_id),
      ]);
      response[0].average_rating = avgRating;
      response[0].reviews = reviews;
      response[0].level = sellerLevel(response[0].total_earning);
    }
  } catch (error) {
    error = error.sqlMessage || error;
    return res.status(400).send(error);
  }
  console.log(response[0].level);
  return res.status(200).send(response);
};
