  const express = require("express");
const router = express.Router();
const db = require("../db");
const utils = require("../utils");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const config = require("../config");
const { token } = require("morgan");
const { route } = require("./Secretary");


router.get("/getAllSocieties", (req, res) => {
  const selectQuery = `
      SELECT * FROM society
    `;
  db.execute(selectQuery, (error, results, fields) => {
    if (error) {
      console.error("Database query error:", error);
      return res.status(500).send({ error: "Internal Server Error" });
    }

    if (results.length === 0) {
      return res.status(404).send({ error: "No societies found" });
    }

    res.send(results);
  });
});

// Backend endpoint to get the count of societies
router.get("/getAllSocietiesCount", (req, res) => {
  const countQuery = `
      SELECT COUNT(*) AS count FROM society
    `;
  db.execute(countQuery, (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      return res.status(500).send({ error: "Internal Server Error" });
    }

    const count = results[0].count;
    res.send({ count });
  });
});




router.get("/getSocietyById/:id", (req, res) => {
  const societyId = req.params.id;
  const selectQuery = `
    SELECT * FROM society
    WHERE id = ?
  `;

  db.execute(selectQuery, [societyId], (error, results, fields) => {
    if (error) {
      console.error("Database query error:", error);
      return res.status(500).send(utils.createErrorResponse("Internal Server Error"));
    }

    if (results.length === 0) {
      return res.status(404).send(utils.createErrorResponse("Society not found"));
    }

    res.send(utils.createResponse(null, results[0]));
  });
});
router.post("/addSociety", (req, res) => {
  const { name, address } = req.body;

  if (!name || !address) {
    return res.status(400).send(utils.createErrorResponse("Missing required fields"));
  }

  const currentTimestamp = new Date().toISOString().slice(0, 19).replace("T", " ");

  const insertQuery = `
      INSERT INTO society (name, address)
      VALUES (?, ?)
    `;
  db.execute(insertQuery, [name, address], (error, results, fields) => {
    if (error) {
      console.error("Database query error:", error);
      return res.status(500).send(utils.createErrorResponse("Internal Server Error"));
    }

    if (results.affectedRows === 0) {
      return res.status(500).send(utils.createErrorResponse("Failed to insert data"));
    }

    res.send(utils.createSuccessResponse("Society added successfully"));
  });
});




router.delete("/deleteSociety/:id", (req, res) => {
  const societyId = req.params.id;

  if (!societyId) {
    return res.status(400).send(utils.createErrorResponse("Society ID is missing"));
  }

  const deleteQuery = `
      DELETE FROM society
      WHERE id = ?
    `;
  db.execute(deleteQuery, [societyId], (error, results, fields) => {
    if (error) {
      console.error("Database query error:", error);
      // return res.status(500).send(utils.createErrorResponse("Internal Server Error"));
      return res.status(500).send(utils.createErrorResponse("Cannot Delete Society with Linked Secretary"));
    }

    if (results.affectedRows === 0) {
      return res.status(404).send(utils.createErrorResponse("Society not found"));
    }

    res.send(utils.createSuccessResponse("Society deleted successfully"));
  });
});

router.put("/updateSociety/:id", (req, res) => {
  const societyId = req.params.id;
  const { name, address } = req.body;

  if (!name || !address) {
    return res.status(400).send(utils.createErrorResponse("Name or Address is missing in the request body"));
  }

  const currentTimestamp = new Date().toISOString().slice(0, 19).replace("T", " ");

  const updateQuery = `
    UPDATE society 
    SET name = ?, address = ?
    WHERE id = ?
  `;

  db.execute(updateQuery, [name, address, societyId], (error, results, fields) => {
    if (error) {
      console.error("Database query error:", error);
      return res.status(500).send(utils.createErrorResponse("Internal Server Error"));
    }

    if (results.affectedRows === 0) {
      return res.status(404).send(utils.createErrorResponse("Society not found"));
    }

    res.send(utils.createSuccessResponse("Society updated successfully", results[0]));
  });
});

module.exports = router;
