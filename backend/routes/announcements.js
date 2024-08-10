const express = require("express");
const router = express.Router();
const db = require("../db");
const utils = require("../utils");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const config = require("../config");
const { token } = require("morgan");

router.post("/addAnnouncement", (req, res) => {
    const { secretary_id, announcement } = req.body;

    console.log(secretary_id)

    if (!secretary_id || !announcement) {
        return res.status(400).json({ error: "Secretary ID or Announcement is missing" });
    }

    const currentTimestamp = new Date().toISOString().slice(0, 19).replace("T", " ");

    const insertQuery = `
          INSERT INTO announcement (secretary_id, announcement, created_at) 
          VALUES (?, ?, ?)
      `;

    db.execute(insertQuery, [secretary_id, announcement, currentTimestamp], (error, results) => {
        if (error) {
            console.error("Database query error:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (results.affectedRows === 0) {
            return res.status(500).json({ error: "Failed to add announcement" });
        }

        res.json({ message: "Announcement added successfully" });
    });
});

router.put("/updateAnnouncement/:id", (req, res) => {
    const announcementId = req.params.id;
    const { announcement } = req.body;

    if (!announcement) {
        return res.status(400).json({ error: "Announcement is missing" });
    }

    const currentTimestamp = new Date().toISOString().slice(0, 19).replace("T", " ");

    const updateQuery = `
          UPDATE announcement 
          SET announcement = ?, updated_at = ?
          WHERE id = ?
      `;

    db.execute(updateQuery, [announcement, currentTimestamp, announcementId], (error, results) => {
        if (error) {
            console.error("Database query error:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Announcement not found" });
        }

        res.json({ message: "Announcement updated successfully" });
    });
});

router.post("/", (req, res) => {
    const { secretaryId } = req.body;

    if (!secretaryId) {
        return res.status(400).json({ error: "Secretary ID is required in the request body" });
    }

    let selectQuery = `
        SELECT *
        FROM announcement
        WHERE secretary_id = ?
    `;

    db.execute(selectQuery, [secretaryId], (error, results) => {
        if (error) {
            console.error("Database query error:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        console.log(results)
        res.json(results);
    });
});


router.get("/announcement", (req, res) => {
    const announcementId = req.body;

    // let selectQuery = `
    //     SELECT *
    //     FROM announcement
    //     WHERE secretary_id = ?
    // `;

    // db.execute(selectQuery, [announcementId], (error, results) => {
    //     if (error) {
    //         console.error("Database query error:", error);
    //         return res.status(500).json({ error: "Internal Server Error" });
    //     }

    //     if (results.length === 0) {
    //         return res.status(404).json({ error: "Announcement not found" });
    //     }

    //     res.json(results[0]);
    // });
});

router.delete("/announcements/:announcementId", (req, res) => {
    const announcementId = req.params.announcementId;

    let deleteQuery = `
        DELETE FROM announcement
        WHERE id = ?
    `;

    db.execute(deleteQuery, [announcementId], (error, results) => {
        if (error) {
            console.error("Database query error:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Announcement not found or unable to delete" });
        }

        res.json({ message: "Announcement deleted successfully" });
    });
});





module.exports = router;