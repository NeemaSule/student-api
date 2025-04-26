const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'student',
    password: 'Neema@@24',
    database: 'student_db'
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL database!");
});

// Get all students
app.get("/students", (req, res) => {
    db.query("SELECT * FROM students", (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

// Get all subjects
app.get("/subjects", (req, res) => {
    db.query("SELECT * FROM subjects", (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

// Add a student
app.post("/students", (req, res) => {
    const { name, program } = req.body;
    db.query("INSERT INTO students (name, program) VALUES (?, ?)", [name, program], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Student added successfully!", id: result.insertId });
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
