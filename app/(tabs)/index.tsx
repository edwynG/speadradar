import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { ScrollView, View, Text, Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';

function dashboardScreen() {
  // Estado para controlar qué tipo de gráfico se muestra (barra o pastel)
  const [isBarChart, setIsBarChart] = useState<boolean>(true);

  return (
    // ScrollView con fondo blanco y padding para el contenido
    <ScrollView className="bg-white" contentContainerStyle={{ padding: 16, gap: 10 }}>
      {/* Oculta el header nativo de la pantalla */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* Controles para cambiar la fecha */}
      <View className="flex-row items-center justify-between">
        {/* Botón para fecha anterior */}
        <Pressable className="w-15 h-15 flex items-center justify-center rounded-full bg-[#F3F4F6] p-4">
          <Entypo name="chevron-left" size={28} color="black" />
        </Pressable>

        {/* Texto con la fecha actual */}
        <View>
          <Text className="text-[23px] font-bold">May 2024</Text>
        </View>

        {/* Botón para fecha siguiente */}
        <Pressable className="w-15 h-15 flex items-center justify-center rounded-full bg-[#F3F4F6] p-4">
          <Entypo name="chevron-right" size={28} color="black" />
        </Pressable>
      </View>

      {/* Sección principal del dashboard */}
      <View className="min-h-[200px] space-y-2 rounded-xl bg-[#F3F4F6] p-3">
        <View className="flex-row items-center justify-between space-x-4">
          {/* Información de gasto total */}
          <View>
            <Text className="text-lg font-light">Total Spending</Text>
            <Text className="text-3xl font-bold">$1,250.75</Text>
          </View>

          {/* Botones para cambiar tipo de gráfico */}
          <View className="flex-row gap-4">
            {/* Botón para gráfico de pastel */}
            <Pressable
              onPress={() => setIsBarChart(true)} // Cambia a gráfico de pastel si no está activo
              className={`h-[60px] w-[55px] rounded-lg p-3 ${
                isBarChart ? 'bg-teal-600' : 'bg-gray-300'
              }`}
            >
              <MaterialIcons
                name="pie-chart-outlined"
                size={28}
                color={isBarChart ? 'white' : 'black'}
              />
            </Pressable>

            {/* Botón para gráfico de barras */}
            <Pressable
              onPress={() => setIsBarChart(false)} // Cambia a gráfico de barras si no está activo
              className={`h-[60px] w-[55px] rounded-lg p-3 ${
                !isBarChart ? 'bg-teal-600' : 'bg-gray-300'
              }`}
            >
              <MaterialIcons name="bar-chart" size={28} color={!isBarChart ? 'white' : 'black'} />
            </Pressable>
          </View>
        </View>

        {/* Texto descriptivo del dashboard */}
        <View>
          <Text>Dashboard</Text>
        </View>
      </View>

      {/* Sección de gastos por categoría */}
      <View className="flex gap-4">
        {/* Título de la sección */}
        <View className="flex h-10 justify-center">
          <Text className="text-xl font-bold">Spending by Category</Text>
        </View>

        {/* Lista de tarjetas de categoría generadas dinámicamente */}
        <View className="flex gap-4">
          {[...Array(3)].map((_, i) => (
            <View
              key={i}
              className="flex-row items-center justify-between gap-4 rounded-xl bg-[#F3F4F6] p-2 py-3"
            >
              {/* Icono y textos de la categoría */}
              <View className="flex-row items-center gap-3">
                <View className="items-center justify-center rounded-full bg-violet-500 p-4">
                  <Feather name="shopping-cart" size={28} color="white" />
                </View>
                <View>
                  <Text className="text-lg font-medium">Groceries</Text>
                  <Text className="text-base font-light">45% of total</Text>
                </View>
              </View>

              {/* Monto gastado en la categoría */}
              <Text className="text-xl font-bold">$562.84</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

export default dashboardScreen;
