const express = require("express");
const router = express.Router();
const db = require("../db");
const utils = require("../utils");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const config = require("../config");
const { token } = require("morgan");

router.post("/addServices", (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Name is missing" });
    }

    const currentTimestamp = new Date().toISOString().slice(0, 19).replace("T", " ");

    const insertQuery = `
        INSERT INTO services (name, updated_at)
        VALUES (?, ?)
    `;

    db.execute(insertQuery, [name, currentTimestamp], (error, results) => {
        if (error) {
            console.error("Database query error:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (results.affectedRows === 0) {
            return res.status(500).send(utils.createErrorResponse("Failed to insert service"));
        }

        res.send(utils.createSuccessResponse("service added successfully"));
    });
});
router.put("/updateService/:id", (req, res) => {
    const serviceId = req.params.id;
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Name is missing" });
    }

    const currentTimestamp = new Date().toISOString().slice(0, 19).replace("T", " ");

    const updateQuery = `
        UPDATE services
        SET name = ?, updated_at = ?
        WHERE id = ?
    `;

    db.execute(updateQuery, [name, currentTimestamp, serviceId], (error, results) => {
        if (error) {
            console.error("Database query error:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "service not found" });
        }

        res.json({ message: "service updated successfully" });
    });
});
router.get("/fetchAllServices", (req, res) => {

    const fetchQuery = `
        SELECT * FROM services
    `;

    db.query(fetchQuery, (error, results) => {
        if (error) {
            console.error("Database query error:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        res.send(utils.createResponse(error, results))
        // res.send(utils.createSuccessResponse({message : "Fetched  all Services SuccessFully"}))
    });
});

router.delete("/deleteService/:id", (req, res) => {
    const serviceId = req.params.id;

    const deleteQuery = `
        DELETE FROM services
        WHERE id = ?
    `;

    db.execute(deleteQuery, [serviceId], (error, results) => {
        if (error) {
            console.error("Database query error:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "service not found" });
        }

        res.send({ message: "service deleted successfully" });
    });
});

module.exports = router;