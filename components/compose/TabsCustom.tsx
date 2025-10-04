import React from 'react';
import { Pressable, Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Button } from '../ui/button';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

interface TabsCustomProps {
  // Aquí puedes definir props si en el futuro necesitas pasar datos al componente
}

export default function TabsCustom(props: TabsCustomProps) {
  return (
    // SafeAreaView para respetar el área segura inferior (ej. barra de navegación en iOS)
    <SafeAreaView edges={['bottom']} className="bg-white">
      {/* Contenedor principal de la barra de pestañas con layout horizontal y separación equitativa */}
      <View className="h-16 flex-row items-center justify-around border-t border-gray-300 bg-white px-2">
        {/* Enlace a la pantalla de categorías */}
        <Link href="/categories" asChild>
          <Pressable className="flex-col items-center">
            <MaterialIcons name="category" size={24} color="#14B8A6" />
            <Text className="text-teal-600">Categories</Text>
          </Pressable>
        </Link>

        {/* Botón central para agregar un nuevo consumo */}
        <View className="relative items-center justify-center">
          <Link href="/addExpenses" asChild>
            <Button
              className="h-16 w-16 translate-y-[-20%] rounded-full bg-teal-600 p-4 active:bg-teal-400"
              variant="secondary">
              {/* Icono de suma grande y blanco */}
              <FontAwesome6 name="add" size={30} color="white" />
            </Button>
          </Link>
        </View>

        {/* Enlace a la pantalla de gastos */}
        <Link href="/expenses" asChild>
          <Pressable className="flex-col items-center">
            <FontAwesome5 name="list-alt" size={24} color="#14B8A6" />
            <Text className="text-teal-600">Expenses</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}
