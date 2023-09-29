import mysql from "mysql2";

export const sql = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "0321",
  database: "niche3",
  port: "3308",
});

export default sql;

// sql.query("select * from user", (err, res) => {
//   console.log(res);
// });
