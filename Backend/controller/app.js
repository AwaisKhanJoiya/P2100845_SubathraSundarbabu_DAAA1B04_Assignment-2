// Class: DAAA/FT/1B/04
// Name: Subathra Sundarbabu
// Admin no.: P2100845

const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config.js");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const isLoggedInMiddleware = require("../auth/isLoggedInMiddleware");

var cors = require("cors");
app.options("*", cors());
app.use(cors());

// ********************
const user = require("../model/user");
// ********************

// sp_it Endpoint1: POST /users/
app.post("/users/", (req, res) => {
  user.insert(req.body, (error, result) => {
    if (error) {
      if (error.code === "ER_DUP_ENTRY") {
        res.status(422).json(error);
      } else {
        res.status(500).json(error);
      }
    } else {
      res.status(201).json(`"userid" : ${result}`);
    }
  });
});

// sp_it Endpoint2: GET/users
app.get("/users", (req, res) => {
  user.findAll((error, allUsers) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.status(200).json(allUsers);
    }
  });
});

// sp_it Endpoint3: GET /users/:id/
app.get("/users/:id/", (req, res) => {
  const id = parseInt(req.params.id);
  const actualLoggedinUserid = req.decodedUserid;
  const actualLoggedinType = req.decodedType;
  if (isNaN(id)) {
    res.status(500).json({ message: "Unacceptable userID submitted" });
  } else if (actualLoggedinUserid !== id && actualLoggedinType !== "Admin") {
    res.status(403).json({ message: "You can only see your own details." });
  } else {
    user.findByID(id, (error, userRecord) => {
      if (error) {
        res.status(500).json(error);
      } else if (userRecord == null) {
        res.status(401).send();
      } else {
        res.status(200).json(userRecord);
      }
    });
  }
});

// sp_it Endpoint4: PUT /users/:id/
app.put("/users/:id/", isLoggedInMiddleware, (req, res) => {
  const id = parseInt(req.params.id);
  user.edit(id, req.body, (error, result) => {
    if (error) {
      if (error.code === "ER_DUP_ENTRY") {
        res.status(422).json(error);
      } else {
        res.status(500).json(error);
      }
    } else {
      res.sendStatus(204);
    }
  });
});

app.post("/login/", (req, res) => {
  user.login(
    req.body.username, // it could be email as well. Dun need to be username
    req.body.password,
    (error, user) => {
      if (error) {
        res.status(500).send();
        return;
      } else if (user == null) {
        res.status(401).send();
        return;
      } else {
        const payload = { userid: user.userid, type: user.type };
        jwt.sign(
          payload,
          JWT_SECRET,
          { algorithm: "HS256" },
          (error, token) => {
            if (error) {
              console.log(error);
              res.status(401).send();
              return;
            } else {
              res.status(200).send({
                userInfo: {
                  username: user.username,
                  email: user.email,
                  type: user.type,
                },
                token: token,
                userid: user.userid,
              });
            }
          }
        );
      }
    }
  );
});

// ********************
const category = require("../model/category");
// ********************

// sp_it Endpoint5: POST /category
app.post("/category", isLoggedInMiddleware, (req, res) => {
  category.insert(req.body, (error, result) => {
    if (error) {
      if (error.code === "ER_DUP_ENTRY") {
        res.status(422).json(error);
      } else {
        res.status(500).json(error);
      }
    } else {
      res.status(204).json(result);
    }
  });
});

// sp_it Endpoint6: GET/category
app.get("/category", (req, res) => {
  category.findAll((error, allcategory) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.status(200).json(allcategory);
    }
  });
});

// ********************
const product = require("../model/product");
// ********************

// sp_it Endpoint7: POST /product/
app.post("/product/", isLoggedInMiddleware, (req, res) => {
  product.insert(req.body, (error, result) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.status(201).json({ message: `productid: <${result}>` });
    }
  });
});

//Getting all the products
app.get("/product", (req, res) => {
  product.findAll((error, allUsers) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.status(200).json(allUsers);
    }
  });
});

// sp_it Endpoint8: GET /product/:id
app.get("/product/:id", (req, res) => {
  const id = parseInt(req.params.id);
  product.findByID(id, (error, userRecord) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.status(200).json(userRecord);
    }
  });
});

// sp_it Endpoint9: DELETE /product/:id/
app.delete("/product/:id/", isLoggedInMiddleware, (req, res) => {
  const id = parseInt(req.params.id);
  product.delete(id, (error, result) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.sendStatus(204);
    }
  });
});

// ********************
const reviews = require("../model/reviews");
// ********************

// sp_it Endpoint10: POST /product/:id/review/
app.post("/product/:id/review/", isLoggedInMiddleware, (req, res) => {
  const id = parseInt(req.params.id);
  reviews.insert(id, req.body, (error, result) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.status(201).json({ message: `reviewid: ${result}` });
    }
  });
});

// sp_it Endpoint11: GET /product/:id/reviews
app.get("/product/:id/review/", (req, res) => {
  const id = parseInt(req.params.id);
  reviews.findByID(id, (error, result) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.status(200).json(result);
    }
  });
});

// ********************
const user_interest = require("../model/user_interest");
// ********************

// sp_it Endpoint12: : POST /interest/:userid
app.post("/interest/:userid", isLoggedInMiddleware, (req, res) => {
  const userid = parseInt(req.params.userid);
  user_interest.insert(userid, req.body, (error, userRecord) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.status(201).json("Nil");
    }
  });
});

// Add the search endpoint

app.get("/searchname", (req, res) => {
  const name = req.body.name;
  product.searchByName(name, (error, results) => {
    if (error) {
      res.status(500).json(`Unknown Error: ${err.message}`);
    } else {
      res.status(200).json(results);
    }
  });
});

module.exports = app;
