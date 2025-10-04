import useSetStackTitle from '@/lib/utils';
import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import { Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/button';
import { router } from 'expo-router';
import { Text } from '@/components/ui/text';


interface ExpenseCardProps {
  title: string;
  date: string;
  amount: number | string;
  category: string;
  onEdit: () => void;
  onDelete: () => void;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({
  title,
  date,
  amount,
  category,
  onEdit,
  onDelete,
}) => {


  return (
    <View className="h-20 flex-row items-center justify-between rounded-md bg-[#F3F4F6] p-2 px-3">
      <View>
        <Text className="text-lg font-bold text-black">{title}</Text>
        <Text className="font-light text-gray-500">{date}</Text>
      </View>

      <View className="flex-row items-center gap-2">
        <View className="flex-col">
          <Text className="self-end text-lg font-bold text-black">${amount}</Text>
          <Text className="self-end font-light text-gray-500">{category}</Text>
        </View>
        <View className="flex-col gap-4">
          <Pressable onPress={onEdit}>
            <Feather name="edit-2" size={17} color="black" />
          </Pressable>
          <Pressable onPress={onDelete}>
            <MaterialIcons name="delete-outline" size={22} color="red" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default function expenses() {
  useSetStackTitle('Expenses');
  return (
    <SafeAreaView edges={['bottom']} className="flex flex-1">
      <View className="flex justify-between gap-2 bg-white p-4 flex-1">
        <View className="flex gap-4">
          <ExpenseCard
            title="Groceries"
            date="2024-06-20"
            amount={150.75}
            category="Food"
            onEdit={() => {}}
            onDelete={() => {}}
          />
          <ExpenseCard
            title="Electricity Bill"
            date="2024-06-18"
            amount={60.0}
            category="Utilities"
            onEdit={() => {}}
            onDelete={() => {}}
          />
          <ExpenseCard
            title="Movie Night"
            date="2024-06-15"
            amount={30.0}
            category="Entertainment"
            onEdit={() => {}}
            onDelete={() => {}}
          />
        </View>

        <View>
          <Button className="bg-teal-600 p-4 active:bg-teal-400 h-12" onPress={() => router.push('/(modal)/addExpenses')}>
            <Text className="text-white font-medium h-5">Add new Expense</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
