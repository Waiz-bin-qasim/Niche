import { sql } from "../Config/DbConfig.js";

export class Categories {
  constructor(Category) {
    this.Category = Category;
  }
  create = (cb) => {
    sql.query(`insert into Categories set ?`, [this.Category], cb);
  };
  static findById = (id, cb) => {
    sql.query(
      "select category_image from categories where category_id = ?",
      [id],
      cb
    );
  };
  static getAll = (cb) => {
    sql.query("select * from categories", cb);
  };

  static deleteById = (id, cb) => {
    sql.query("delete from categories where category_id = ?", [id], cb);
  };
}
