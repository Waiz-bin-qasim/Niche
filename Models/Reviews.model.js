import sql from "../Config/DbConfig.js";
export class Review {
  constructor(review) {
    this.review = review;
  }
  createAsync = () => {
    return new Promise((res, rej) => {
      sql.query("INSERT INTO reviews SET ?", [this.review], (err, result) => {
        if (err) rej(err);
        else res(result);
      });
    });
  };

  static getSellerReviews = (seller_id) => {
    return new Promise((res, rej) => {
      sql.query(
        `select r.review_id,r.project_id,r.reviewer_id,r.reviewee_id,r.rating,r.review_comment,r.review_date, u.username from reviews r,users u where r.reviewee_id = ? and r.reviewer_id = u.username LIMIT 5`,
        [seller_id],
        (err, result) => {
          if (err) rej(err);
          else res(result);
        }
      );
    });
  };
}
