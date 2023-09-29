import sql from "../Config/DbConfig.js";
export class Status_Verification {
  constructor(status) {
    this.status = status;
  }
  create = (cb) => {
    sql.query(
      "INSERT INTO status_verification SET ?",
      [this.status],
      (err, res) => {
        if (err) cb(err, null);
        else {
          cb(null, res);
        }
      }
    );
  };
}
