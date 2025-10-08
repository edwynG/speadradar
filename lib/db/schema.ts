// db/schema.ts (separate file for SQL statements)
export const PRAGMA_JOURNAL_MODE_WAL = `PRAGMA journal_mode = 'wal';`;

export const CREATE_CATEGORIES_TABLE = `
  CREATE TABLE IF NOT EXISTS category (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    name_icon TEXT NOT NULL
  );
`;

export const CREATE_EXPENSES_TABLE = `
  CREATE TABLE IF NOT EXISTS expense (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER NOT NULL,
    amount REAL NOT NULL,
    date DATE NOT NULL,
    description TEXT,
    FOREIGN KEY (category_id) REFERENCES category(id)
  );
`;

export const INSERT_CATEGORIES = `
  INSERT INTO category (name, name_icon) VALUES 
  ('Food', 'FaUtensils'),
  ('Transport', 'FaBus'),
  ('Leisure', 'FaGamepad'),
  ('Health', 'FaHeartbeat'),
  ('Education', 'FaBook');
`;

export const INSERT_EXPENSES = `
  INSERT INTO expense (category_id, amount, date, description) VALUES
  (1, 12.50, '2025-09-28', 'Lunch at restaurant'),
  (2, 3.75, '2025-09-28', 'Taxi to work'),
  (3, 20.00, '2025-09-27', 'Movie ticket'),
  (1, 5.00, '2025-09-29', 'Coffee and snack'),
  (4, 15.00, '2025-09-29', 'Medicines'),
  (5, 30.00, '2025-09-30', 'Programming book');
`;
