const mysql = require("mysql");
module.exports = {
  getConnection: function () {
    var conn = mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "", //your own password
      database: "sp_it",
      dateStrings: true,
    });
    return conn;
  },
};
