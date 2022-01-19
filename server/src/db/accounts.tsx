import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

import { DB_ACCOUNTS_FILE_PATH, IS_PROD } from '../constants';

if (!IS_PROD) {
  sqlite3.verbose();
}

export const accounts = await open({
  filename: DB_ACCOUNTS_FILE_PATH,
  driver: sqlite3.cached.Database,
});

try {
  await accounts.run(`
    CREATE TABLE IF NOT EXISTS accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT,
      theme TEXT,
      favorities TEXT
    )
  `);
} catch (e) {
  console.error('\n\nCannot create account table\n', e);
  process.exit(1);
}

export let insertNewUserAccountStmt = await accounts.prepare(
  'INSERT INTO accounts (email, password, theme, favorities) Values(?, ?, ?, ?);'
);

export let selectUserAccountStmt = await accounts.prepare(
  'SELECT email, password, theme, favorities FROM accounts WHERE email = ?'
);
