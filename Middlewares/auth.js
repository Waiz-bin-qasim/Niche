import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

export const createToken = (data, expiresIn) => {
  try {
    return jwt.sign(data, "!@#$sjdvjkldnvd$%^", {
      expiresIn: expiresIn,
    });
  } catch (error) {
    throw error;
  }
};

export const authToken = (req, res, next) => {
  const token = req.body.token || req.headers.token || req.params.token;
  try {
    if (!token) {
      res.status(401).send("Unauthorized: No token provided");
      return;
    } else {
      jwt.verify(token, "!@#$sjdvjkldnvd$%^", (err, decoded) => {
        if (err) {
          res.status(401).send("Unauthorized: Invalid token");
          console.log(err);
          return;
        } else {
          if (decoded) {
            req.body = { ...decoded, ...req.body };
            req.token = { ...decoded };
            console.log(req.body);
            next();
          } else {
            res.status(401).send("Unauthorized: Invalid token");
            return;
          }
        }
      });
    }
  } catch (error) {
    res.send({ error }).status(401);
    return;
  }
};
