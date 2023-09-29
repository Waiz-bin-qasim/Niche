import { createToken } from "../Middlewares/auth.js";
import { User } from "../Models/User.model.js";
import { SendEmail } from "../Services/sendEmail.js";

export const verifyEmail = (req, res) => {
  const { email } = req.body;
  User.updateByEmail(email, { is_verified: 1 }, (err, result) => {
    if (err) res.status(400).send(err);
    else {
      res.status(200).send("email verified");
    }
  });
};

export const resendToken = (req, res) => {
  const { email } = req.body;
  const token = createToken({ email: email }, "2h");
  User.findByEmail(email, (err, result) => {
    if (err) res.status(400).send(err);
    else {
      if (result[0].is_verified === 1) {
        res.status(200).send({ message: "Account already verified" });
      } else {
        const verificationLink = `http://localhost:3000/verify/${token}`;
        SendEmail(
          email,
          "Verification Code",
          "Click the link to verify our account \n" +
            verificationLink +
            "\n link will expire in 2 hours ",
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
    }
  });
};
