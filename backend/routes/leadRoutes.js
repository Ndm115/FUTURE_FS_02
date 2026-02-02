const express = require("express");
const router = express.Router();
const db = require("../config/db");
const auth = require("../middleware/authMiddleware");

router.post("/", (req, res) => {
  const { name, email, message } = req.body;

  db.query(
    "INSERT INTO leads (name,email,message) VALUES (?,?,?)",
    [name, email, message],
    (err, result) => res.json({ id: result.insertId })
  );
});

router.get("/", auth, (req, res) => {
  db.query("SELECT * FROM leads ORDER BY created_at DESC",
    (err, results) => res.json(results)
  );
});

router.put("/:id/status", auth, (req, res) => {
  db.query("UPDATE leads SET status=? WHERE id=?",
    [req.body.status, req.params.id],
    () => res.json({ message: "Updated" })
  );
});

router.post("/:id/notes", auth, (req, res) => {
  db.query("INSERT INTO notes (lead_id,note) VALUES (?,?)",
    [req.params.id, req.body.note],
    () => res.json({ message: "Note added" })
  );
});

router.get("/:id/notes", auth, (req, res) => {
  db.query("SELECT * FROM notes WHERE lead_id=? ORDER BY created_at DESC",
    [req.params.id],
    (err, results) => res.json(results)
  );
});

module.exports = router;
