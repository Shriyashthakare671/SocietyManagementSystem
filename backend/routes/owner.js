const express = require("express");
const router = express.Router();
const db = require("../db");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const config = require("../config");

router.post("/registerOwner", (req, res) => {
    const { secretary_id, address, flat_no, name, mobile_no, email, password } = req.body;

    console.log(req.body);
// !secretary_id 
    if (!secretary_id || !flat_no || !address || !name || !mobile_no || !email || !password) {
        return res.status(400).json({ error: "One or more required fields are missing" });
    }
    const encryptedPassword = String(crypto.SHA256(password));
    console.log(encryptedPassword)
    const insertQuery = `
        INSERT INTO owner (secretary_id, flat_no, name, address, mobile_no, email, password)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    console.log("Line-1")
    db.execute(insertQuery, [secretary_id, flat_no, name, address, mobile_no, email, encryptedPassword], (error, results) => {
        if (error) {
            console.error("Database query error:", error);
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: "Duplicate entry. This flat number is already registered." });
            }
            return res.status(500).json({ error: "Internal Server Error" });
        }
        console.log("Line-2")
        res.json({ message: "Owner registered successfully" });
    });
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    console.log(email + password);

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    const encryptedPassword = String(crypto.SHA256(password));

    const selectQuery = `
        SELECT * FROM owner
        WHERE email = ? AND password = ?
    `;

    db.execute(selectQuery, [email, encryptedPassword], (error, results) => {
        if (error) {
            console.error("Database query error:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const user = results[0];
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email
        };

        console.log(user);
        try {
            const jwtToken = jwt.sign(payload, config.secret);
            console.log("JWT Token:", jwtToken);
            // res.json({ message: "Login successful", user, token: jwtToken });
            res.json(results[0])
        } catch (error) {
            console.error("JWT Generation Error:", error);
            return res.status(500).json({ error: "JWT Generation Error" });
        }
    });
});

router.put("/updateOwner/:id", (req, res) => {
    const ownerId = req.params.id;
    const { secretary_id, flat_no, name, address, mobile_no, email, password } = req.body;

    if (!secretary_id || !flat_no || !name || !address || !mobile_no || !email || !password) {
        return res.status(400).json({ error: "One or more required fields are missing" });
    }

    const currentTimestamp = new Date().toISOString().slice(0, 19).replace("T", " ");
    const encryptedPassword = String(crypto.SHA256(password));

    const updateQuery = `
        UPDATE owner
        SET secretary_id = ?, flat_no = ?, name = ?, address = ?, mobile_no = ?, email = ?, password = ?, created_at = ?
        WHERE id = ?
    `;

    db.execute(updateQuery, [secretary_id, flat_no, name, address, mobile_no, email, encryptedPassword, currentTimestamp, ownerId], (error, results) => {
        if (error) {
            console.error("Database query error:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Owner not found" });
        }

        res.json({ message: "Owner details updated successfully" });
    });
});

router.get("/owners", (req, res) => {

  const secretary_id = req.query.secretaryId;

  // Check if secretaryId is provided
  if (!secretary_id) {
    return res.status(400).json({ error: "Secretary ID is required" });
  }

  const selectQuery = `
    SELECT * FROM owner WHERE secretary_id = ?
  `;

  db.query(selectQuery, [secretary_id], (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    console.log(results)

    res.json({ owners: results });
  });
});


router.post('/countOwners', (req, res) => {
    const { secretaryId } = req.body; // Extract secretaryId from the request body
    const selectQuery = `
        SELECT count(*) AS count FROM owner WHERE secretary_id = ?
    `;

    db.query(selectQuery, [secretaryId], (error, results) => {
        if (error) {
            console.error("Database query error:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        const count = results[0].count; // Extract count from the result
        res.json({ count }); // Send count as JSON response
    });
});



router.get("/getOwnerById/:id", (req, res) => {
    const ownerId = req.params.id;

    const selectQuery = `
        SELECT * FROM owner
        WHERE id = ?
    `;

    db.query(selectQuery, [ownerId], (error, results) => {
        if (error) {
            console.error("Database query error:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "Owner not found" });
        }

        res.json({ owner: results[0] });
    });
});

router.delete("/deleteOwner/:id", (req, res) => {
    const ownerId = req.params.id;

    const deleteQuery = `
        DELETE FROM owner
        WHERE id = ?
    `;

    db.query(deleteQuery, [ownerId], (error, results) => {
        if (error) {
            console.error("Database query error:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Owner not found" });
        }

        res.json({ message: "Owner deleted successfully" });
    });
});

router.post("/forgotPassword", (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    const selectQuery = `
        SELECT * FROM owner
        WHERE email = ?
    `;

    db.execute(selectQuery, [email], (error, results) => {
        if (error) {
            console.error("Database query error:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "Email not found" });
        }

        const user = results[0];
        const token = crypto.randomBytes(32).toString("hex");

        const updateQuery = `
            UPDATE owner
            SET reset_token = ?
            WHERE email = ?
        `;

        db.execute(updateQuery, [token, email], (error, results) => {
            if (error) {
                console.error("Database query error:", error);
                return res.status(500).json({ error: "Internal Server Error" });
            }

            // Send email with reset link
            const resetLink = `http://your-domain.com/reset-password/${token}`;
            // Use a library like nodemailer to send the email
            // For simplicity, I'll just log the reset link
            console.log(`Reset link: ${resetLink}`);

            res.json({ message: "Reset link sent to your email" });
        });
    });
});

router.post("/resetPassword/:token", (req, res) => {
    const token = req.params.token;
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({ error: "Password is required" });
    }

    const selectQuery = `
        SELECT * FROM owner
        WHERE reset_token = ?
    `;

    db.execute(selectQuery, [token], (error, results) => {
        if (error) {
            console.error("Database query error:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "Invalid reset token" });
        }

        const user = results[0];
        const encryptedPassword = String(crypto.SHA256(password));

        const updateQuery = `
            UPDATE owner
            SET password = ?, reset_token = NULL
            WHERE email = ?
        `;

        db.execute(updateQuery, [encryptedPassword, user.email], (error, results) => {
            if (error) {
                console.error("Database query error:", error);
                return res.status(500).json({ error: "Internal Server Error" });
            }

            res.json({ message: "Password reset successfully" });
        });
    });
});

module.exports = router;
