import sql from "../Config/DbConfig.js";
export class User {
  constructor(user) {
    this.user = user;
  }
  create = (cb) => {
    sql.query("INSERT INTO users SET ?", [this.user], (err, res) => {
      if (err) cb(err, null);
      else {
        cb(null, res);
      }
    });
  };
  static findByEmail = (email, cb) => {
    sql.query(
      "select user_id,password,role,is_verified,status from users where email = ? ",
      [email],
      (err, res) => {
        if (err) {
          cb(err, null);
        } else {
          if (res.length) {
            console.log("found Login: ", res);
            cb(null, { Found: true, ...res });
            return;
          }
          // not found Login with the id
          cb(null, { Found: false, ...res });
        }
      }
    );
  };
  static updateByEmail = (email, values, cb) => {
    sql.query("update users set ? where email = ?", [values, email], cb);
  };

  static findById = (id, cb) => {
    sql.query("select * from users where user_id = ? ", [id], cb);
  };

  static updateById = (id, values, cb) => {
    sql.query("update users set ? where user_id = ?", [values, id], cb);
  };
}
