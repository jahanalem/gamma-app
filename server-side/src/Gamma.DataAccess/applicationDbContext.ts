const mysql = require("mysql2");

export class ApplicationDbContext {
  constructor() {}

  static db = mysql
    .createPool({
      host: "localhost",
      user: "root",
      database: "gamma_db",
    })
    .promise();
}
