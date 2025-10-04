import React from 'react';
import { Platform, Pressable, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../ui/text';

interface CustomHeaderProps {
  navigation: any; // Objeto de navegación para controlar la navegación entre pantallas
  route: any; // Información de la ruta actual
  options: any; // Opciones de configuración del header, como el título
  back?: boolean; // Indica si se debe mostrar el botón de "volver atrás"
}

export default function AppBarCustom({ navigation, route, options, back }: CustomHeaderProps) {
  return (
    // SafeAreaView para respetar el área segura superior (notch, barra de estado)
    <SafeAreaView edges={['top']} className="border-b border-gray-300 bg-white">
      {/* Contenedor principal del header con layout horizontal y espaciado */}
      <View
        className={`m-1 flex-row items-center justify-between px-2 ${Platform.select({ web: 'h-[79px]', android: 'h-14' })} // Altura según plataforma relative bg-transparent`}>
        {/* Sección izquierda: botón de volver y título */}
        <View className={`flex-1 flex-row relative items-center gap-2 ${!back ? 'justify-start' : 'justify-center'}`}>
          {/* Mostrar botón "back" solo si la prop back es true */}
          {back && (
            <Pressable onPress={navigation.goBack} className="p-1 absolute left-0" style={{ paddingRight: 14 }}>
              {/* Icono de flecha hacia atrás */}
              <Ionicons name="chevron-back" size={28} color="#111827" />
            </Pressable>
          )}

          {/* Título del header: usa options.title o el nombre de la ruta */}
          <Text className="text-xl font-bold text-gray-900">{options.title ?? route.name}</Text>
        </View>

        {/* Sección derecha: botón de configuración, solo si no hay botón "back" */}
        <View>
          {!back && (
            <Pressable
              onPress={() => navigation.navigate('(modal)/settings')} // Navega a la pantalla de configuración modal
            >
              {/* Icono de engranaje para configuración */}
              <Ionicons name="settings-outline" size={24} color="#111827" />
            </Pressable>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
