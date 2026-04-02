const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// This creates the database file in your prisma folder
const db = new sqlite3.Database(path.join(__dirname, '../prisma/dev.db'));
 
db.serialize(() => {
  // Create Users Table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT DEFAULT 'VIEWER'
  )`);

  // Create Financial Records Table
  db.run(`CREATE TABLE IF NOT EXISTS records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount REAL,
    type TEXT, 
    category TEXT,
    date TEXT DEFAULT CURRENT_TIMESTAMP,
    userId INTEGER,
    FOREIGN KEY(userId) REFERENCES users(id)
  )`);
});

module.exports = db;