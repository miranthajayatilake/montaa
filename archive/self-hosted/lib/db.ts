import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

let db: Database.Database | null = null;

export function getDb() {
  if (db) return db;
  const dir = process.env.DATA_DIR ?? path.join(process.cwd(), "data");
  fs.mkdirSync(dir, { recursive: true });
  db = new Database(path.join(dir, "waitlist.db"));
  db.pragma("journal_mode = WAL");
  db.exec(`CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE COLLATE NOCASE,
    name TEXT,
    use_case TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`);
  return db;
}
