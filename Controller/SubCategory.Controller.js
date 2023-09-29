import { cleanLink } from "../Helper/cleanLink.js";
import { SubCategory } from "../Models/SubCategory.model.js";
import fs from "fs";

export const addSubCategory = (req, res) => {
  if (!req.files[0]) {
    return res.status(400).json({ error: "No image uploaded" });
  } else {
    const path = cleanLink(req.files[0].path);
    const { subCategory_name, parent_id } = req.body;
    if (subCategory_name) {
      const subCategory = new SubCategory({
        subCategory_image: path,
        subCategory_name,
        parent_id,
      });
      subCategory.create((err, result) => {
        if (err) {
          fs.unlink(path, (err2) => {
            if (err) {
              res.status(400).send({ error: err.sqlMessage, ...err2 });
            } else {
              res.status(400).send(err.sqlMessage);
            }
          });
        } else {
          res.status(200).send("done");
        }
      });
    } else {
      res.status(400).send({ err: "SubCategory_name required" });
    }
  }
};

export const deleteSubCategory = (req, res) => {
  try {
    const { SubCategory_id } = req.params;
    if (SubCategory_id) {
      SubCategory.findById(SubCategory_id, (err, result) => {
        if (err) res.status(400).send({ err: err.sqlMessage });
        else {
          if (result.length > 0) {
            const filePath = result[0].subCategory_image;
            fs.unlink(filePath, (err) => {
              if (err) {
                console.error("Error deleting the file:", err);
              } else {
                console.log("File deleted successfully");
                SubCategory.deleteById(SubCategory_id, (err, result) => {
                  if (err) res.status(400).send({ err: err.sqlMessage });
                  else {
                    console.log(result);
                    res.status(200).send("done");
                  }
                });
              }
            });
          } else {
            res.status(400).send({ err: "invalid subCategory_id" });
          }
        }
      });
    } else {
      res.status(400).send({ err: "SubCategory_id Required" });
    }
  } catch (err) {
    res.status(500);
  }
};

export const getSubCategory = (req, res) => {};
