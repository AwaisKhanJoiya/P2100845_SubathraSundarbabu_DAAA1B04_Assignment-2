// Class: DAAA/FT/1B/04
// Name: Subathra Sundarbabu
// Admin no.: P2100845

const db = require("./databaseConfig");

module.exports = {
  // sp_it: category.insert(callback)
  insert: function (newUser, callback) {
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {
      if (err) {
        //database connection gt issue!
        console.log(err);
        return callback(err, null);
      } else {
        const { category, description } = newUser;
        const insertUserQuery = `
                    INSERT INTO category (category,description)
                    VALUES (?, ?);
                    `;
        dbConn.query(
          insertUserQuery,
          [category, description],
          (error, results) => {
            dbConn.end();
            if (error) {
              return callback(error, null);
            } else {
              return callback(null, results.insertId); // typically used to show success in insert
            }
          }
        );
      }
    });
  },
  // sp_it: category.findAll(callback)
  findAll: function (callback) {
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {
      if (err) {
        //database connection gt issue!
        console.log(err);
        return callback(err, null);
      } else {
        const findAllUsersQuery = "SELECT * FROM category;";
        dbConn.query(findAllUsersQuery, (error, results) => {
          if (error) {
            return callback(error, null);
          } else if (results.length == 0) {
            return callback(null, null);
          } else {
            return callback(null, results);
          }
        });
      }
    });
  },
};
