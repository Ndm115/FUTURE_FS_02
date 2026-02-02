const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM admins WHERE email = ?", [email], (err, result) => {
    if (err) return res.status(500).json({ message: err });
    if (result.length === 0) return res.status(400).json({ message: "Admin not found" });

    const admin = result[0];
    bcrypt.compare(password, admin.password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: err });
      if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

      const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });
      res.json({ token });
    });
  });
});

module.exports = router;
