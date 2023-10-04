import sql from "../Config/DbConfig.js";

export class JobPost {
  constructor(jobPost) {
    this.jobPost = jobPost;
  }
  createAsync = () => {
    return new Promise((res, rej) => {
      sql.query(
        "insert into projects set ? ",
        [this.jobPost],
        (err, result) => {
          if (err) rej(err);
          else res(result);
        }
      );
    });
  };

  static getBuyerProjectsAsync = async (buyer_id) => {
    return new Promise((res, rej) => {
      sql.query(
        `SELECT
        pro.project_title,pro.project_description,pro.budget,pro.project_date ,COUNT(p.project_id) AS total_proposal
        FROM
        projects pro
        LEFT JOIN
        proposals p ON pro.project_id = p.project_id
        where pro.buyer_id = ?
        GROUP BY pro.project_id;`,
        [buyer_id],
        (err, result) => {
          if (err) rej(err);
          else res(result);
        }
      );
    });
  };

  static getProjectDateByIdAsync = (project_id, buyer_id) => {
    return new Promise((res, rej) => {
      sql.query(
        "select project_date from projects where project_id = ? and buyer_id = ? ",
        [project_id, buyer_id],
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

  static deleteProjectByIdAsync = (project_id, buyer_id) => {
    return new Promise((res, rej) => {
      sql.query(
        "delete from projects where project_id = ? and buyer_id = ? ",
        [project_id, buyer_id],
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

  static updateProjectByIdAsync = async (project_id, buyer_id, values) => {
    return new Promise((res, rej) => {
      sql.query(
        "update projects set ? where project_id = ? and buyer_id = ? ",
        [values, project_id, buyer_id],
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

  static getAllProjectsSellerAsync = () => {
    return new Promise((res, rej) => {
      sql.query(
        `SELECT pro.project_title,pro.project_description,pro.budget,pro.project_date,pro.location,pro.project_id,pro.subCategory_id,u.username,pro.buyer_id  
        FROM projects pro,users u 
        WHERE pro.buyer_id = u.user_id`,
        (err, result) => {
          if (err) rej(err);
          else res(result);
        }
      );
    });
  };

  static getOneProjectsSellerByIdAsync = (project_id) => {
    return new Promise((res, rej) => {
      sql.query(
        `SELECT pro.project_title,pro.project_description,pro.budget,pro.project_date,pro.location,pro.project_id,pro.subCategory_id,u.username,pro.buyer_id  
        FROM projects pro,users u 
        WHERE pro.buyer_id = u.user_id`,
        (err, result) => {
          if (err) rej(err);
          else res(result);
        }
      );
    });
  };
}
