import sql from "../Config/DbConfig.js";

export class Favorites {
  constructor(favorites) {
    this.favorites = favorites;
  }
  createAsync = () => {
    return new Promise((res, rej) => {
      sql.query(
        "INSERT INTO Favorites SET ?",
        this.favorites,
        (err, result) => {
          if (err) rej(err);
          else res(result);
        }
      );
    });
  };

  static getFavoriteByBuyerIdAsync = (buyer_id) => {
    return new Promise((res, rej) => {
      sql.query(
        "select s.service_id,s.service_title , s.service_description from favorites f,services s where f.buyer_id = ? and f.service_id = s.service_id and s.is_draft = 0 ",
        [buyer_id],
        (err, result) => {
          if (err) rej(err);
          else res(result);
        }
      );
    });
  };

  static getFavoriteByIdAsync = (buyer_id, favorite_id) => {
    return new Promise((res, rej) => {
      sql.query(
        "select s.service_title , s.service_description from favorite f,services s where f.buyer_id = ? and f.service_id = s.service_id and f.favorite_id = ?",
        [buyer_id, favorite_id],
        (err, result) => {
          if (err) rej(err);
          else res(result);
        }
      );
    });
  };

  static deleteFavoriteByIdAsync = (buyer_id, favorite_id) => {
    return new Promise((res, rej) => {
      sql.query(
        "delete from favorites where buyer_id = ? and favorite_id = ?",
        [buyer_id, favorite_id],
        (err, result) => {
          if (err) rej(err);
          else res(result);
        }
      );
    });
  };
}
