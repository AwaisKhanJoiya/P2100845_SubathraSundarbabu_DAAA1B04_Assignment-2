// Class: DAAA/FT/1B/04
// Name: Subathra Sundarbabu
// Admin no.: P2100845

const db = require("./databaseConfig");

module.exports = {
    // sp_it: reviews.insert(callback)
    insert: function(id, newUser, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            } else {
                const {userid, rating, review, productid} = newUser;
                const insertUserQuery =
                `
                INSERT INTO reviews (userid, rating, review,productid)
                VALUES (?, ?, ?, (SELECT categoryid from product WHERE productid = product.categoryid))
                `;
                dbConn.query(
                    insertUserQuery,
                    [id, userid, rating, review, productid],
                    (error, results) => {
                dbConn.end();
                    if (error) {
                        return callback(error, null);
                    } else {
                        return callback(null, results.insertId); // typically used to show success in insert
                    }
                });
            }
        });
    },
    // sp_it: reviews.findByID(callback)
    findByID: function (id, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            } else {
                const findByIDQuery =
                    `
                    SELECT 
                      productid,
                      user.userid, 
                      username, 
                      rating, 
                      review,
                      reviews.created_at
                    FROM user,reviews
                    where reviews.userid = user.userid 
                    and reviews.productid = ? 
                    `;
                dbConn.query(findByIDQuery, id, (error, results) => {
                    dbConn.end();
                    if (error) {
                        callback(error, null);
                        return;
                    } else {
                        return callback(null, results);
                    }
                });
            }
        });
    }

}