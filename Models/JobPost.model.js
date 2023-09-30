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
}
