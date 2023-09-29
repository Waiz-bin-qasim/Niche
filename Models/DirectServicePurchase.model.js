import { sql } from "../Config/DbConfig.js";

export class DirectServicePurchase {
  constructor(purchase) {
    this.purchase = purchase;
  }
  create = (cb) => {
    sql.query(`insert into directservicepurchases set ?`, [this.purchase], cb);
  };
  static findById = (id, cb) => {
    sql.query("select * from directservicepurchases where ?", [id], cb);
  };
  static getAll = (cb) => {
    sql.query("select * from directservicepurchases", cb);
  };

  static deleteById = (id, user_id, cb) => {
    sql.query(
      "delete from directservicepurchases where purchase_id = ? and seller_id = ?",
      [id, user_id],
      cb
    );
  };

  static updateById = (values, id, purchase_id, cb) => {
    sql.query(
      "update directservicepurchases set ? where ? and ?",
      [values, id, purchase_id],
      cb
    );
  };

  static updateStatusAsync = async (purchase_id, seller_id, status) => {
    return new Promise((res, rej) => {
      sql.query(
        "update directservicepurchases set status = ? where purchase_id = ? and seller_id = ?",
        [status, purchase_id, seller_id],
        (err, result) => {
          if (err) {
            rej(err);
          } else {
            res(result);
          }
        }
      );
    });
  };

  static findUserEmailByPurchaseIdAsync = (purchase_id) => {
    return new Promise((res, rej) => {
      sql.query(
        "select u.email,u.role,u.username from users u , directservicepurchase d where u.user_id = d.seller_id or u.user_id = d.buyer_id ",
        [purchase_id],
        (err, result) => {
          if (err) {
            rej(err);
          } else {
            res(result);
          }
        }
      );
    });
  };
}
