import { sql } from "../Config/DbConfig.js";

export class Services {
  constructor(service) {
    this.service = service;
  }
  create = (cb) => {
    sql.query(`insert into Services set ?`, [this.service], cb);
  };

  static createDraft = async (values) => {
    values.is_draft = 1;
    return new Promise((res, rej) => {
      sql.query(`insert into Services set ?`, [values], (err, result) => {
        if (err) return rej(err);
        else {
          res(result);
        }
      });
    });
  };

  static deleteDraftById = async (service_id, seller_id) => {
    return new Promise((res, rej) => {
      sql.query(
        "delete from Services where service_id = ? and seller_id = ? and is_draft = 1",
        [service_id, seller_id],
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

  static findDraftByIdAsync = async (service_id, seller_id) => {
    return new Promise((res, rej) => {
      sql.query(
        "select * from Services where service_id = ? and seller_id = ? and is_draft = 1",
        [service_id, seller_id],
        (err, result) => {
          if (err) rej(err);
          else res(result);
        }
      );
    });
  };

  static updateDraftByIdAsync = async (service_id, seller_id, values) => {
    return new Promise((res, rej) => {
      sql.query(
        "update services set ? where service_id = ? and seller_id = ? and is_draft = 1",
        [values, service_id, seller_id],
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

  static getAllDraft = async (seller_id) => {
    return new Promise((res, rej) => {
      sql.query(
        "select * from services where seller_id = ? and is_draft = 1",
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

  static getOneDraft = (service_id, seller_id) => {
    return new Promise((res, rej) => {
      sql.query(
        "select * from services where service_id = ? and seller_id = ? and is_draft = 1",
        [service_id, seller_id],
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

  static publishDraft = (service_id, seller_id) => {
    return new Promise((res, rej) => {
      sql.query(
        "update services set is_draft = 0 where service_id = ? and seller_id = ? and is_draft = 1",
        [service_id, seller_id],
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

  // --------------------------
  // Drafts
  static findById = (id, cb) => {
    sql.query(
      `select s.service_id,s.seller_id,u.first_name,u.last_name,s.service_image,s.service_price,s.service_title,s.service_description,s.duration,u.profile_picture,se.average_rating,se.total_projects_completed,u.bio
      ,u.user_address,u.user_city,u.user_country ,c.category_id,c.category_name,sub.subCategory_id,sub.subCategory_name,s.is_featured from services s , users u, sellers se , categories c , subCategories sub where s.seller_id = se.seller_id and se.seller_id = u.user_id and s.subCategory_id = sub.subCategory_id and c.category_id = sub.parent_id and s.is_draft = 0 and s.service_id = ?`,
      [id],
      cb
    );
  };

  static getAll = (cb) => {
    sql.query("select * from Services", cb);
  };

  static deleteById = (id, seller_id, cb) => {
    sql.query(
      "delete from Services where service_id = ? and seller_id = ? and is_draft = 0",
      [id, seller_id],
      cb
    );
  };

  static updateById = (service_id, seller_id, values, cb) => {
    const query = `update services set ? where service_id = ? and seller_id = ? and is_draft = 0`;
    sql.query(query, [values, service_id, seller_id], cb);
  };

  static findAll = (cb) => {
    sql.query(
      `select s.service_id,s.seller_id,u.first_name,u.last_name,s.service_image,s.service_price,s.service_title,s.service_description,s.duration,u.profile_picture,se.average_rating,se.total_projects_completed,u.bio
      ,u.user_address,u.user_city,u.user_country ,c.category_id,c.category_name,sub.subCategory_id,sub.subCategory_name,s.is_featured from services s , users u, sellers se , categories c , subCategories sub where s.seller_id = se.seller_id and se.seller_id = u.user_id and s.subCategory_id = sub.subCategory_id and c.category_id = sub.parent_id and s.is_draft = 0`,
      cb
    );
  };

  static findByUser = (id, cb) => [
    sql.query(`select * from services where seller_id = ?`, [id], cb),
  ];

  static getBySubCategory = (id, cb) => {
    sql.query(
      `select s.service_id,s.seller_id,u.first_name,u.last_name,s.service_image,s.service_price,s.service_title,s.service_description,s.duration,u.profile_picture,se.average_rating,se.total_projects_completed,u.bio
      ,u.user_address,u.user_city,u.user_country ,c.category_id,c.category_name,sub.subCategory_id,sub.subCategory_name,s.is_featured from services s , users u, sellers se , categories c , subCategories sub where s.seller_id = se.seller_id and se.seller_id = u.user_id and s.subCategory_id = sub.subCategory_id and c.category_id = sub.parent_id and s.is_draft = 0 and s.subCategory_id = ?`,
      [id],
      cb
    );
  };

  static getAllRatingsBySellerIdAsync = (seller_id) => {
    return new Promise((res, rej) => {
      sql.query(
        "select total_projects_completed,total_rating from services where seller_id = ? and is_draft = 0 ",
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

  static getAllBestServiceAsync = () => {
    return new Promise((res, rej) => {
      sql.query(
        "SELECT * FROM services where is_draft = 0 ORDER BY (total_projects_completed * total_rating) DESC; ",
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
