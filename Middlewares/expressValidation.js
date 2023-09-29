import { body, validationResult } from "express-validator";
import { User } from "../Models/User.model.js";

export const checkError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};

export const uniqueEmail = [
  body("email")
    .isEmail()
    .custom(async (value) => {
      User.findByEmail(value, (err, res) => {
        if (err) new Error("E-mail already in use");
      });
    }),
];
