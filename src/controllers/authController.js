const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(
      `INSERT INTO users (email, password, role) VALUES (?, ?, ?)`,
      [email, hashedPassword, role || 'VIEWER'],
      function (err) {
        if (err) return res.status(400).json({ error: "Email already exists" });
        res.status(201).json({ message: "User created successfully", id: this.lastID });
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Server error during registration" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (err) return res.status(500).json({ error: "Database error" });
    
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { id: user.id, role: user.role }, 
        'your_secret_key', 
        { expiresIn: '1h' }
      );
      res.json({ token, role: user.role });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  });
};