import fs from "fs";
export const deleteFile = async (path) => {
  let prom;
  try {
    prom = new Promise((res, rej) => {
      fs.unlink(path, (err) => {
        if (err) rej(err);
        else res();
      });
    });
  } catch (error) {
    throw error;
  }
  return prom;
};
