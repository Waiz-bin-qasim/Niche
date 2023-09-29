import path from "path";
import { currDir } from "../Helper/currDir.js";
const __dirname = currDir(import.meta.url);

export const ImageGet = (req, res) => {
  const { imageName, folder } = req.params;
  const imagePath = path.join(__dirname, "../Images/" + folder, imageName);
  // console.log(imagePath);
  res.sendFile(imagePath, (err) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.status(404).send("Image not found");
      } else {
        res.status(500).send("Error retrieving image");
      }
    }
  });
};
