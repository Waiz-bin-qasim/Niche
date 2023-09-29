import sql from "../Config/DbConfig.js";

export class Admin {
  constructor(admin) {
    this.admin = admin;
  }
  create = (cb) => {
    sql.query("insert into admin set ? ", [this.admin], cb);
  };

  static findByEmail = (email, cb) => {
    sql.query(
      "select password,admin_id from admin where email = ? ",
      email,
      cb
    );
  };
}
