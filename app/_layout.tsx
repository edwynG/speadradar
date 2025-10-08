import '@/global.css';

import React, { useLayoutEffect } from 'react';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import AppBarCustom from '@/components/compose/AppBarCustom';
import { StatusBar } from 'react-native';
import { ThemeProvider } from '@react-navigation/native';
import { NAV_THEME } from '@/lib/theme';
import { useColorScheme } from 'nativewind';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  openDatabaseAsync,
  SQLiteProvider,
  type SQLiteDatabase,
} from 'expo-sqlite';
import { migrateDbIfNeeded } from '@/lib/db/migrate';
import { connectModelsToDb } from '@/lib/db/db';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

const db_name = 'test.db';
export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  useLayoutEffect(() => {
    openDatabaseAsync(db_name).then((db: SQLiteDatabase) => {
      // Aquí puedes hacer algo con la base de datos si es necesario
      connectModelsToDb(db);
    } )
  });

  return (
    <>
      <SafeAreaProvider>
        <SQLiteProvider databaseName={db_name} onInit={migrateDbIfNeeded} useSuspense>
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

