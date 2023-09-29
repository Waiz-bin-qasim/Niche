import multer from "multer";
import path from "path";
const multerConfig = (dir) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      // Generate a unique filename for the uploaded image
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, uniqueSuffix + ext);
    },
  });
  return multer({ storage }).array("image",2);
};

export default multerConfig;
