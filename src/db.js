const Database = require('better-sqlite3');
const path = require('path');

// This creates/connects to the database file in your prisma folder
const db = new Database(path.join(__dirname, '../prisma/dev.db'), { verbose: console.log });

// Initialize Tables (better-sqlite3 uses .exec for multiple statements)
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT DEFAULT 'VIEWER'
  );

  CREATE TABLE IF NOT EXISTS financial_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    amount REAL,
    category TEXT,
    date TEXT,
    description TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

module.exports = db;