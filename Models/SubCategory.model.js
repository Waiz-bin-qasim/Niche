import sql from "../Config/DbConfig.js";

export class SubCategory {
  constructor(subCategory) {
    this.subCategory = subCategory;
  }
  create = (cb) => {
    sql.query("insert into subCategories set ? ", [this.subCategory], cb);
  };
  static findById = (id, cb) => {
    sql.query(
      "select subCategory_image from subCategories where subCategory_id = ?",
      [id],
      cb
    );
  };
  static getAllAsync = () => {
    return new Promise((resolve, reject) => {
      sql.query(`select * from subCategories`, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  };

  static findByCategoryId = (id, cb) => {
    sql.query("select * from subCategories where parent_id = ?", [id], cb);
  };

  static deleteById = (id, cb) => {
    sql.query("delete from subCategories where subCategory_id = ?", [id], cb);
  };
}
