import { createToken } from "../Middlewares/auth.js";
import { User } from "../Models/User.model.js";
import { Decrypt } from "../Services/passwordHash.js";
import { Admin } from "../Models/Admin.model.js";

export const User_Login = async (req, res) => {
  const { email, password } = req.body;
  User.findByEmail(email, async (err, result) => {
    try {
      if (err) throw err;
      else {
        if (result.Found === true) {
          const compare = await Decrypt(password, result[0].password);
          if (compare) {
            if (result[0].is_verified === 1) {
              let token = createToken(
                {
                  role: result[0].role,
                  user_id: result[0].user_id,
                  status: result[0].status,
                },
                "1d"
              );
              res.send({ token, role: result[0].role }).status(200);
            } else {
              res.status(200).send({ message: "Account not verified" });
            }
          } else {
            throw "Incorrect Username Or Password";
          }
        } else {
          throw "Incorrect Username Or Password";
        }
      }
    } catch (err) {
      res.status(400).send(err);
    }
  });
};

export const adminLogin = (req, res) => {
  const { email, password } = req.body;
  Admin.findByEmail(email, (err, result) => {
    try {
      if (err) {
        console.log(err);
        throw err.sqlMessage;
      } else {
        if (result.length && result[0].password === password) {
          const token = createToken(
            { id: result[0].admin_id, type: "Admin" },
            "1d"
          );
          res.status(200).send({ token });
          return;
        } else {
          res.status(400).send({ msg: "Incorrect username or password" });
        }
      }
    } catch (error) {
      res.status(400).send(error);
    }
  });
};
