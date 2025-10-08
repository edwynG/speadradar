// migrate.ts (or wherever you have the migration function)
import { SQLiteDatabase } from 'expo-sqlite';
import {
  PRAGMA_JOURNAL_MODE_WAL,
  CREATE_CATEGORIES_TABLE,
  CREATE_EXPENSES_TABLE,
  INSERT_CATEGORIES,
  INSERT_EXPENSES,
} from './schema';

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;

  // Obtener la versión actual de la base de datos
  const { user_version: currentDbVersion } = (await db.getFirstAsync<{ user_version: number }>(
    'PRAGMA user_version'
  )) || { user_version: 0 };

  console.log('Current DB Version:', currentDbVersion);
  console.log('Target DB Version:', DATABASE_VERSION);

  // Si la versión actual es igual o mayor, no hacer nada
  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }

  try {
    // Configuración WAL para mejor rendimiento
    await db.execAsync(PRAGMA_JOURNAL_MODE_WAL);

    // Ejecutar migración dentro de una transacción para seguridad y atomicidad
    await db.execAsync('BEGIN TRANSACTION;');
    // Crear tablas si no existen
    await db.execAsync(CREATE_CATEGORIES_TABLE);
    await db.execAsync(CREATE_EXPENSES_TABLE);

    // Insertar datos iniciales
    await db.runAsync(INSERT_CATEGORIES);
    await db.runAsync(INSERT_EXPENSES);

    // Actualizar versión de la base de datos
    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION};`);

    // Confirmar transacción
    await db.execAsync('COMMIT;');

    console.log('Database migrated to version', DATABASE_VERSION);
  } catch (error) {
    // En caso de error, revertir cambios
    await db.execAsync('ROLLBACK;');
    console.error('Migration failed:', error);
    throw error;
  }
}
