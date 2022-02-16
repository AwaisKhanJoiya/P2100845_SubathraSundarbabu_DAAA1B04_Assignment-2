// Class: DAAA/FT/1B/04
// Name: Subathra Sundarbabu
// Admin no.: P2100845

const category = require("./category");
const db = require("./databaseConfig");

module.exports = {
    // sp_it: user_insert.insert(callback)
    insert: function(userid, newUser, callback) {
        var dbConn = db.getConnection();
        var split = [];
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            } else {
                const {categoryids} = newUser;
                split_string = categoryids.split(",")
                // console.log(split_string)
                for(i = 0;i < split_string.length;i++) {
                    split.push([userid, split_string[i]])
                }
                const insertUserQuery =
                `
                INSERT INTO user_interest (userid,categoryid)
                VALUES ?
                
                `;
                dbConn.query(
                    insertUserQuery,
                    [split],
                    (error, results) => {
                dbConn.end();
                    if (error) {
                        return callback(error, null);
                    } else {
                        return callback(null, results.insertId); // typically used to show success in insert
                    }
                });
            }
        })
    } 
}