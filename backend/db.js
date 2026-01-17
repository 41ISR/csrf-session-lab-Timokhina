const Database = require("sqlite")

const db = new Database("database.db")

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        balance INTEGER DEFAULT 1000,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    `)

module.exports = db