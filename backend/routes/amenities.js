const express = require("express");
const router = express.Router();
const db = require("../db");
const utils = require("../utils");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const config = require("../config");
const { token } = require("morgan");

router.post("/addAmenities", (req, res) => {
  const { secretary_id, name } = req.body;
  console.log(req.body)

  if (!secretary_id || !name) {
    return res.status(400).json({ error: "secretaryId orName is missing" });
  }


  const insertQuery = `
  INSERT INTO amenities (secretary_id, name) 
  VALUES (?, ?)
    `;

  db.execute(insertQuery, [secretary_id ,name], (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.affectedRows === 0) {
        return res.status(500).send(utils.createErrorResponse("Failed to insert Amenity"));
      }
  
      res.send(utils.createSuccessResponse("Amenity added successfully"));
  });
});

router.delete("/deleteAmenity/:id", (req, res) => {
    const amenityId = req.params.id;
    
    const deleteQuery = `
        DELETE FROM amenities
        WHERE id = ?
    `;
    
    db.execute(deleteQuery, [amenityId], (error, results) => {
        if (error) {
            console.error("Database query error:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Amenity not found" });
        }
        
        res.json({ message: "Amenity deleted successfully" });
    });
});


router.put("/updateAmenity/:id", (req, res) => {
    const amenityId = req.params.id;
    const { name } = req.body;
    
    if (!name) {
        return res.status(400).json({ error: "Name is missing" });
    }
    
    const currentTimestamp = new Date().toISOString().slice(0, 19).replace("T", " ");
    
    const updateQuery = `
        UPDATE amenities
        SET name = ?
        WHERE id = ?
    `;
    
    db.execute(updateQuery, [name, amenityId], (error, results) => {
        if (error) {
            console.error("Database query error:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Amenity not found" });
        }
        
        res.json({ message: "Amenity updated successfully" });
    });
});

router.post("/", (req, res) => {
    console.log(req.body)
    const { secretaryId } = req.body;

    // Check if secretaryId is provided
    if (!secretaryId) {
        return res.status(400).json({ error: "Secretary ID is required" });
    }

    const selectQuery = `
        SELECT * FROM amenities WHERE secretary_id = ?
    `;

    db.query(selectQuery, [secretaryId], (error, results) => {
        if (error) {
            console.error("Database query error:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        res.json({ data: results });
    });
});


module.exports = router;
