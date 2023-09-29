import { createToken } from "../Middlewares/auth.js";
import { Buyer } from "../Models/Buyer.model.js";
import { Seller } from "../Models/Seller.model.js";
import { User } from "../Models/User.model.js";
import { Encrypt } from "../Services/passwordHash.js";
import { SendEmail } from "../Services/sendEmail.js";

export const User_Signup = async (req, res) => {
  let {
    username,
    email,
    password,
    first_name,
    last_name,
    role,
    user_phone,
    user_address,
    user_city,
    user_state,
    user_country,
    user_zipcode,
  } = req.body;
  password = await Encrypt(password);
  let user = new User({
    username,
    email,
    password,
    first_name,
    last_name,
    registration_date: new Date(),
    role,
    user_phone,
    user_address,
    user_city,
    user_state,
    user_country,
    user_zipcode,
    is_online: 0,
    is_verified: 0,
  });
  user.create((err, result) => {
    try {
      if (err) {
        console.log(err);
        throw err.sqlMessage;
      } else {
        if (role === "seller") {
          const seller = new Seller({ seller_id: result.insertId });
          seller.create((err, result) => {
            if (err) return res.status(400).send({ err: err.sqlMessage });
            else {
              const token = createToken({ email: email }, "2h");
              const verificationLink = `http://localhost:3000/verify/${token}`;
              SendEmail(
                email,
                "Verification Code",
                "Click the link to verify our account \n" + verificationLink,
                (err2, Info) => {
                  if (err2) {
                    throw new Error(err2);
                  } else {
                    res
                      .status(200)
                      .send({ message: "Verification email has been sent" });
                  }
                }
              );
            }
          });
        } else {
          const buyer = new Buyer({ buyer_id: result.insertId });
          buyer.create((err, result) => {
            if (err) return res.status(400).send({ err: err.sqlMessage });
            else {
              const token = createToken({ email: email }, "2h");
              const verificationLink = `http://localhost:3000/verify/${token}`;
              SendEmail(
                email,
                "Verification Code",
                "Click the link to verify our account \n" + verificationLink,
                (err2, Info) => {
                  if (err2) {
                    throw new Error(err2);
                  } else {
                    res
                      .status(200)
                      .send({ message: "Verification email has been sent" });
                  }
                }
              );
            }
          });
        }
      }
    } catch (err) {
      res.status(400).send({ err });
    }
  });
};
