// Class: DAAA/FT/1B/04
// Name: Subathra Sundarbabu
// Admin no.: P2100845

const db = require("./databaseConfig");

module.exports = {
  // sp_it: user.insert(callback)
  insert: function (newUser, callback) {
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {
      if (err) {
        //database connection gt issue!
        console.log(err);
        return callback(err, null);
      } else {
        const { username, email, contact, password, type, profile_pic_url } =
          newUser;
        const insertUserQuery = `
                INSERT INTO user (username, email, contact, password,type,profile_pic_url)
                VALUES (?, ?, ?, ?, ?, ?);
                `;
        dbConn.query(
          insertUserQuery,
          [username, email, contact, password, type, profile_pic_url],
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
  findAll: function (callback) {
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {
      if (err) {
        //database connection gt issue!
        console.log(err);
        return callback(err, null);
      } else {
        const findAllUsersQuery = `
                SELECT 
                userid,
                username,
                email,
                contact,
                type,
                profile_pic_url,
                created_at

                FROM user;`;
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
  }, // sp_it: user.findAll(callback)
  // sp_it: user.findByID(callback)
  findByID: function (id, callback) {
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {
      if (err) {
        //database connection gt issue!
        console.log(err);
        return callback(err, null);
      } else {
        const findUserByIDQuery = `
                SELECT 
                userid,
                username,
                email,
                contact,
                type,
                profile_pic_url,
                created_at

                FROM user
                WHERE userid = ?
                ;`;
        dbConn.query(findUserByIDQuery, [id], (error, results) => {
          dbConn.end();
          if (error) {
            return callback(error, null);
          } else if (results.length == 0) {
            return callback(null, null);
          } else {
            // console.log(results);
            return callback(null, results);
          }
        });
      }
    });
  },
  // sp_it: user.edit(callback)
  edit: function (id, post, callback) {
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {
      if (err) {
        //database connection gt issue!
        console.log(err);
        return callback(err, null);
      } else {
        const editPostQuery = `
                UPDATE 
                    user
                SET 
                    username = ?,
                    email = ?, 
                    contact = ?, 
                    password = ?,
                    type = ?,
                    profile_pic_url = ? 
                          
                WHERE 
                    userid = ?`;
        dbConn.query(
          editPostQuery,
          [
            post.username,
            post.email,
            post.contact,
            post.password,
            post.type,
            post.profile_pic_url,
            id,
          ],
          (error, results) => {
            if (error) {
              return callback(error, null);
            } else {
              return callback(null, results);
            }
          }
        );
      }
    });
  },
  //login function in practical 7. You can change the verify to login.
  login: function (username, password, callback) {
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {
      if (err) {
        //database connection gt issue!
        console.log(err);
        return callback(err, null);
      } else {
        // const query = "SELECT * FROM user WHERE username=? and password=?";
        const query =
          "SELECT userid,type,username,email FROM user WHERE username=? and password=?";

        dbConn.query(query, [username, password], (error, results) => {
          if (error) {
            callback(error, null);
            return;
            // } else if (results.length === 0) { this is not wrong but the second one is better version.
          } else if (results.length !== 1) {
            return callback(null, null);
          } else {
            const user = results[0];
            return callback(null, user);
          }
        });
      }
    });
  },
};
