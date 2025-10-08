
import { SQLiteDatabase } from 'expo-sqlite';

let conn: SQLiteDatabase | null = null;

export function connectModelsToDb(db: SQLiteDatabase) {
  conn = db;

}

export function getDbConnection(): SQLiteDatabase {
  if (!conn) throw new Error('Database not connected. Call connectModelsToDb first.');
  return conn;
} 
