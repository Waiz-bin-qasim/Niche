import sql from "../Config/DbConfig.js";
export class Seller {
  constructor(seller) {
    this.seller = seller;
  }
  create = (cb) => {
    sql.query("INSERT INTO sellers SET ?", [this.seller], (err, res) => {
      if (err) cb(err, null);
      else {
        cb(null, res);
      }
    });
  };

  static updateById = (id, values, cb) => {
    sql.query("update sellers set ? where seller_id = ?", [values, id], cb);
  };

  static getSellerProfile = (id, cb) => {
    sql.query(
      "select u.username,u.first_name,u.last_name,u.bio,u.profile_picture,u.user_city,u.user_state,u.user_country,s.average_rating,s.total_projects_completed from users u join sellers s on s.seller_id = u.user_id where s.seller_id = ?",
      [id],
      cb
    );
  };

  static getAllSeller = (cb) => {
    sql.query(
      "select u.registration_date,u.first_name,u.last_name,s.total_projects_completed,s.average_rating from sellers s,users u where s.seller_id = u.user_id",
      cb
    );
  };

  static getSellerAsync = (seller_id) => {
    return new Promise((res, rej) => {
      sql.query(
        `select 
        s.total_projects_completed,
        s.total_earning,
        s.seller_id,
        s.hourly_rate,
        s.current_package,
        s.average_rating,
        s.avaliable_credits,
        s.availability_status,
        u.first_name,
        u.last_name,
        u.profile_picture
         from sellers s,users u where seller_id = ? and seller_id = user_id`,
        [seller_id],
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
