import sql from "../Config/DbConfig.js";
export class Buyer {
  constructor(buyer) {
    this.buyer = buyer;
  }
  create = (cb) => {
    sql.query("INSERT INTO buyers SET ?", [this.buyer], (err, res) => {
      if (err) cb(err, null);
      else {
        cb(null, res);
      }
    });
  };

  static updateById = (id, values, cb) => {
    sql.query("update buyers set ? where buyer_id = ?", [values, id], cb);
  };
}
