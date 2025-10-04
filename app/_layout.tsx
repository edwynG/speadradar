import '@/global.css';

import React from 'react';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import AppBarCustom from '@/components/compose/AppBarCustom';
import { StatusBar } from 'react-native';
import { ThemeProvider } from '@react-navigation/native';
import { NAV_THEME } from '@/lib/theme';
import { useColorScheme } from 'nativewind';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  SQLiteProvider,
  type SQLiteDatabase,
} from 'expo-sqlite';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const { colorScheme } = useColorScheme();



  return (
    <>
      <SafeAreaProvider>
        <SQLiteProvider databaseName="test.db" onInit={migrateDbIfNeeded} assetSource={{ assetId: require('@/assets/db/test.db') }} useSuspense>
          <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
            <StatusBar
              hidden={false} // Asegura que no esté oculta
              barStyle="dark-content" // Color del texto e íconos (puede ser "light-content" o "dark-content")
              backgroundColor="#ffffff" // Color de fondo (Android)
              translucent={false} // Si es true, la app dibuja debajo de la barra
            />
            <Stack
              screenOptions={({ route }) => ({
                header: (props) => <AppBarCustom {...(props as any)} />,
              })}>
              <Stack.Screen name="(tabs)" options={{ title: 'Expense tracker' }} />
            </Stack>
            <PortalHost />
          </ThemeProvider>
        </SQLiteProvider>
      </SafeAreaProvider>
    </>
  );
}

async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;
  let { user_version: currentDbVersion } = await db.getFirstAsync<{ user_version: number } | any>(
    'PRAGMA user_version'
  );
  console.log('Current DB Version:', currentDbVersion);
  console.log('Target DB Version:', DATABASE_VERSION);
  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  if (currentDbVersion === 3) {
    await db.execAsync(`
PRAGMA journal_mode = 'wal';
-- Tabla para categorías de gastos
CREATE TABLE categorias (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL UNIQUE
);

-- Tabla para gastos
CREATE TABLE gastos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  categoria_id INTEGER NOT NULL,
  monto REAL NOT NULL,
  fecha DATE NOT NULL,
  descripcion TEXT,
  FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);
`);
    await db.runAsync(
      "INSERT INTO categorias (nombre) VALUES ('Comida'), ('Transporte'), ('Ocio'), ('Salud'), ('Educación')"
    );
    await db.runAsync(`INSERT INTO gastos (categoria_id, monto, fecha, descripcion) VALUES
  (1, 12.50, '2025-09-28', 'Almuerzo en restaurante'),
  (2, 3.75, '2025-09-28', 'Taxi al trabajo'),
  (3, 20.00, '2025-09-27', 'Entrada al cine'),
  (1, 5.00, '2025-09-29', 'Café y snack'),
  (4, 15.00, '2025-09-29', 'Medicinas'),
  (5, 30.00, '2025-09-30', 'Libro de programación');`);
    currentDbVersion = 1;
  }
  // if (currentDbVersion === 1) {
  //   Add more migrations
  // }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
