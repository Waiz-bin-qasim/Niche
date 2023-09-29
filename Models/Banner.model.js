import sql from "../Config/DbConfig.js";

export class Banner {
  constructor(banner) {
    this.banner = banner;
  }
  create = (cb) => {
    sql.query("INSERT INTO banner SET ?", [this.banner], (err, res) => {
      if (err) cb(err, null);
      else {
        cb(null, res);
      }
    });
  };
  static getAll = (cb) => {
    sql.query("select banner_image,banner_id from banner", cb);
  };

  static findById = (id, cb) => {
    sql.query("select banner_image from banner where banner_id = ?", [id], cb);
  };

  static deleteById = (id, cb) => {
    sql.query("delete from banner where banner_id = ?", [id], cb);
  };
}
