import multer from "multer";
import multerConfig from "../Config/multer.js";

export const imageUpload = (str) => {
  const upload = multerConfig(str);
  return (req, res, next) => {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
      } else if (err) {
        return res.status(400).json({ error: err.message });
      }
      console.log("done");
      next();
    });
  };
};
