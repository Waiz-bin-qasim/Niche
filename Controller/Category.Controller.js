import { Categories } from "../Models/Categories.model.js";
import fs from "fs";
import { SubCategory } from "../Models/SubCategory.model.js";
import { cleanLink } from "../Helper/cleanLink.js";

export const addCategory = (req, res) => {
  if (!req.files[0]) {
    return res.status(400).json({ error: "No image uploaded" });
  } else {
    const path = cleanLink(req.files[0].path);
    const { category_name } = req.body;
    if (category_name) {
      const category = new Categories({
        category_image: path,
        category_name: category_name,
      });
      category.create((err, result) => {
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
      res.status(400).send({ err: "category_name required" });
    }
  }
};

export const getCategory = (req, res) => {
  let { category_id } = req.params;
  category_id = parseInt(category_id);
  if (typeof category_id == "number") {
    SubCategory.findByCategoryId(category_id, (err, result) => {
      if (err) res.status(400).send({ err: err.sqlMessage });
      else {
        console.log(result);
        res.status(200).send(result);
      }
    });
  } else {
    res.status(400).send({ err: "category_id not provided" });
  }
};

export const getAllCategory = (req, res) => {
  Categories.getAll((err, result) => {
    if (err) res.status(400).send({ err: err.sqlMessage });
    else {
      console.log(result);
      res.status(200).send(result);
    }
  });
};

export const deleteCategory = (req, res) => {
  try {
    const { category_id } = req.params;
    if (category_id) {
      Categories.findById(category_id, (err, result) => {
        if (err) res.status(400).send({ err: err.sqlMessage });
        else {
          if (result.length > 0) {
            const filePath = result[0].category_image;
            fs.unlink(filePath, (err) => {
              if (err) {
                console.error("Error deleting the file:", err);
              } else {
                console.log("File deleted successfully");
                Categories.deleteById(category_id, (err, result) => {
                  if (err) res.status(400).send({ err: err.sqlMessage });
                  else {
                    console.log(result);
                    res.status(200).send("done");
                  }
                });
              }
            });
          } else {
            res.status(400).send({ err: "invalid Category_id" });
          }
        }
      });
    } else {
      res.status(400).send({ err: "category_id Required" });
    }
  } catch (err) {
    res.status(500);
  }
};
