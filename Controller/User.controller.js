import { cleanLink } from "../Helper/cleanLink.js";
import { createToken } from "../Middlewares/auth.js";
import { Status_Verification } from "../Models/Status_Verification.model.js";
import { User } from "../Models/User.model.js";
import { Encrypt } from "../Services/passwordHash.js";
import { SendEmail } from "../Services/sendEmail.js";
import fs from "fs";

export const resetPasswordReq = (req, res) => {
  try {
    const { email } = req.query || req.body;
    User.findByEmail(email, (err, result) => {
      if (err) {
        throw err;
      } else {
        if (result.Found == true) {
          let token = createToken(
            { email: email, type: "Reset Password" },
            "2h"
          );
          const verificationLink = `http://localhost:3000/verify/${token}`;
          SendEmail(
            email,
            "Re-set Password",
            "Click the link to verify our account \n" + verificationLink,
            (err2, Info) => {
              if (err2) {
                return res.status(400).send(err2);
              } else {
                res
                  .status(200)
                  .send({ message: "Re-set Password email has been sent" });
              }
            }
          );
        } else {
          res.status(200).send({ err: "invalid email" });
        }
      }
    });
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const resetPassword = async (req, res) => {
  try {
    let { email, password } = req.body;
    console.log(password);
    password = await Encrypt(password);
    User.updateByEmail(email, { password: password }, (err, result) => {
      if (err) res.status(400).send(err);
      else {
        res.status(200).send("password Re-set Done");
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
};

export const getStatus = (req, res) => {
  const { status, user_id, role } = req.body;
  User.findById(user_id, (err, result) => {
    if (err) {
      return res.status(400).send({ err: err.sqlMessage });
    } else {
      if (result.length > 0) {
        if (result[0].status === status) {
          let token = createToken(
            {
              role: role,
              user_id: user_id,
              status: status,
            },
            "1d"
          );
          res.status(200).send({ token, status: status });
        } else {
          let token = createToken(
            {
              role: role,
              user_id: user_id,
              status: result[0].status,
            },
            "1d"
          );
          res.status(200).send({ token, status: result[0].status });
        }
      }
    }
  });
};

export const verification = (req, res) => {
  const { bio } = req.body;
  const { user_id } = req.token;
  if (!req.files || !bio) {
    return res
      .status(400)
      .json({ error: "No image uploaded or bio not provided" });
  } else {
    console.log(req.files);
    const status = new Status_Verification({
      image1: cleanLink(req.files[0].path),
      image2: cleanLink(req.files[1].path),
      bio,
      user_id,
    });
    status.create((err, result) => {
      if (err) {
        req.files.map((file) => {
          fs.unlink(file.path, (err2) => {
            if (err) {
              return res.status(400).send({ error: err.sqlMessage, ...err2 });
            } else {
              return res.status(400).send(err.sqlMessage);
            }
          });
        });
      } else {
        console.log(result);
        if (result.affectedRows) {
          res.send("done");
        }
      }
    });
  }
};

export const addCard = async (req, res) => {
  const { user_id, user_card_number, user_card_expiry, user_card_cvc } =
    req.body;
  let response;
  try {
    if ((user_card_number, user_card_expiry, user_card_cvc)) {
      response = await User.addCardByIdAsync(user_id, {
        user_card_number,
        user_card_expiry,
        user_card_cvc,
      });
    } else {
      throw "Something missing in body";
    }
  } catch (error) {
    response = err.sqlMessage || error;
    return res.status(400).send(response);
  }
  return res.send(response);
};

export const getCard = async (req, res) => {
  const { user_id } = req.body;
  let response;
  try {
    response = await User.getCardByIdAsync(user_id);
    if (response.length === 0) {
      throw "User Card Credentials Not Found";
    }
  } catch (error) {
    response = err.sqlMessage || error;
    return res.status(400).send(response);
  }
  return res.send(response);
};
