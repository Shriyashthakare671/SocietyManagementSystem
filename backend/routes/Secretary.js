const express = require("express");
const router = express.Router();
const db = require("../db");
const utils = require("../utils");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const config = require("../config");
const { token } = require("morgan");


router.get('/fetchSecretary', (req, res) =>{
  db.query(`SELECT * From secretary`, (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      return res.status(500).json(utils.createErrorResponse("Internal Server Error"));
    }

    if (results.length === 0) {
      return res.status(404).json(utils.createErrorResponse("No data found"));
    }

    
    res.json(utils.createSuccessResponse(results));
  });
  });
 
router.post("/registerSecretary", (req, res) => {

  console.log("fuckkk"+req.body)
  const { society_id, name, email, mobile_no, password } = req.body;

  console.log("Society ID:", society_id); // Log society_id

  if (!society_id || !name || !email || !mobile_no || !password) {
    return res.status(400).send(utils.createErrorResponse("Missing required fields"));
  }

  const currentTimestamp = new Date().toISOString().slice(0, 19).replace("T", " ");

  const encryptedPassword = String(crypto.SHA256(password));

  const insertQuery = `
        INSERT INTO secretary (society_id, name, email, mobile_no, password, last_login_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

  db.execute(
    insertQuery,
    [society_id, name, email, mobile_no, encryptedPassword, currentTimestamp],
    (error, results, fields) => {
      if (error) {
        console.error("Database query error:", error);
        return res.status(500).send(utils.createErrorResponse("Internal Server Error: " + error.message));
      }
      res.send(utils.createSuccessResponse("Secretary inserted successfully"));
    }
  );
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;


  if (!email || !password) {
    return res.status(400).send(utils.createErrorResponse("Please provide the email and password"));
  }

  const encryptedPassword = String(crypto.SHA256(password));

  const selectQuery = "SELECT * FROM secretary WHERE email = ? AND password = ?";

  db.execute(selectQuery, [email, encryptedPassword], (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      return res.status(500).send(utils.createErrorResponse("Internal Server Error"));
    }

    if (results.length === 0) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    const user = results[0];
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const jwtToken = jwt.sign(payload, config.secret);
    console.log(jwtToken);

    //  res.json(utils.createResponse(error , results))
     res.send(utils.createSuccessResponse({ token: jwtToken, name: user.name , secretary_id:user.id }));
    // res.send(utils.createSuccessResponse(results)); 
  });
});


module.exports = router;
