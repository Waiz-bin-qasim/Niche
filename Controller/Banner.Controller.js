import { cleanLink } from "../Helper/cleanLink.js";
import { Banner } from "../Models/Banner.model.js";
import fs from "fs";

export const BannerPost = (req, res) => {
  if (req.files) {
    if (!req.files[0]) {
      return res.status(400).json({ error: "No image uploaded" });
    }
  } else {
    return res.status(400).json({ error: "No image provided" });
  }
  const path = cleanLink(req.files[0].path);
  const { id } = req.headers;
  const banner = new Banner({
    admin_id: id,
    banner_image: path,
  });
  banner.create((err, result) => {
    if (err) {
      fs.unlink(path, (err2) => {
        if (err) {
          res.status(400).send({ error: err.sqlMessage, ...err2 });
        } else {
          res.status(400).send(err.sqlMessage);
        }
      });
    } else {
      res.status(200).json({ message: "Image Uploaded" });
    }
  });
};

export const getBannerLink = (req, res) => {
  Banner.getAll((err, result) => {
    if (err) res.status(400).send({ err: err });
    else {
      console.log(result);
      res.status(200).send(result);
    }
  });
};

export const deleteBanner = (req, res) => {
  try {
    const { banner_id } = req.params;
    if (banner_id) {
      Banner.findById(banner_id, (err, result) => {
        if (err) res.status(400).send({ err: err.sqlMessage });
        else {
          if (result.length > 0) {
            const filePath = result[0].banner_image;
            fs.unlink(filePath, (err) => {
              if (err) {
                console.error("Error deleting the file:", err);
              } else {
                console.log("File deleted successfully");
                Banner.deleteById(banner_id, (err, result) => {
                  if (err) res.status(400).send({ err: err.sqlMessage });
                  else {
                    console.log(result);
                    res.status(200).send("done");
                  }
                });
              }
            });
          } else {
            res.status(400).send({ err: "invalid banner_id" });
          }
        }
      });
    } else {
      res.status(400).send({ err: "Banner_id Required" });
    }
  } catch (err) {
    res.status(500);
  }
};
