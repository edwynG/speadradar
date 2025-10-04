import { Label } from '@/components/ui/label';
import useSetStackTitle from '@/lib/utils';
import Octicons from '@expo/vector-icons/Octicons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Pressable, Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState, useCallback } from 'react';
import { Switch } from '@/components/ui/switch';
import { useRouter } from 'expo-router';

// Componente interno para ítems repetidos
const SettingsItem = ({
  icon,
  label,
  labelColor = 'black',
  onPress,
  rightComponent,
}: {
  icon: React.ReactNode;
  label: string;
  labelColor?: string;
  onPress?: () => void;
  rightComponent?: React.ReactNode;
}) => (
  <Pressable
    onPress={onPress}
    accessibilityRole="button"
    accessibilityLabel={label}
    className="h-16 w-full flex-row items-center justify-between rounded-md bg-[#F3F4F6] p-4 active:bg-[#f3f5f667]">
    <View className="flex-row items-center gap-4">
      {icon}
      <Text className={`text-lg`} style={{ color: labelColor }}>
        {label}
      </Text>
    </View>
    <View>{rightComponent ?? <EvilIcons name="chevron-right" size={32} color="black" />}</View>
  </Pressable>
);

function Settings() {
  useSetStackTitle('Settings');
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  // Usar useCallback para evitar recrear funciones en cada render
  const onCheckedChange = useCallback((newChecked: boolean) => {
    setChecked(newChecked);
  }, []);

  const onPressSwitch = useCallback(() => {
    setChecked((prev) => !prev);
  }, []);

  return (
    <View className="flex-1 gap-6 bg-white p-4">
      {/* GENERAL */}
      <View className="gap-3">
        <Label className="font-bold text-gray-700">GENERAL</Label>
        <SettingsItem
          icon={<Octicons name="history" size={22} color="black" />}
          label="Expenses History"
          onPress={() => router.push('/(modal)/histories')}
        />
      </View>

      {/* APPEARANCE */}
      <View className="gap-3">
        <Label className="font-bold text-gray-700">APPEARANCE</Label>
        <SettingsItem
          icon={<MaterialIcons name="dark-mode" size={24} color="black" />}
          label="Dark mode"
          onPress={onPressSwitch}
          rightComponent={<Switch checked={checked} onCheckedChange={onCheckedChange} />}
        />
      </View>

      {/* DATA */}
      <View className="gap-3">
        <Label className="font-bold text-gray-700">DATA</Label>
        <View className="flex-1 gap-4">
          <SettingsItem
            icon={<MaterialCommunityIcons name="database" size={24} color="blue" />}
            label="Import data"
            labelColor="#2563EB" // azul
            onPress={() => {
              // lógica para importar datos
            }}
          />
          <SettingsItem
            icon={<MaterialCommunityIcons name="delete-forever-outline" size={24} color="red" />}
            label="Delete all data"
            labelColor="#DC2626" // rojo
            onPress={() => {
              // lógica para borrar datos
            }}
          />
        </View>
      </View>
    </View>
  );
}

export default Settings;
