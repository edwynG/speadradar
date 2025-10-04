import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import useSetStackTitle from '@/lib/utils';
import React, { use } from 'react';
import { Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { router } from 'expo-router';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';

interface CategoryCardProps {
  title: string;
  amountTransactions: number;
  category: string;
  iconComponente: React.ReactElement;
  onEdit: () => void;
  onDelete:()=> void;
  ClassnameIcon?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  amountTransactions,
  category,
  iconComponente,
  onEdit,
  ClassnameIcon,
  onDelete,
}) => {
  return (
    <View className="h-20 flex-row items-center justify-between rounded-md bg-[#F3F4F6] p-2">
      <View className="flex-row items-center justify-center gap-4">
        <View className={'rounded-full p-4 ' + ClassnameIcon}>{iconComponente}</View>
        <View>
          <Text className="text-lg font-bold text-black">{title}</Text>
          <Text className="font-light text-gray-500">{amountTransactions} transactions</Text>
        </View>
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
  );
};

function categories() {
  useSetStackTitle('Categories');
  return (
    <SafeAreaView edges={['bottom']} className="flex flex-1">
      <View className="flex flex-1 justify-between bg-white p-4 pb-4">
        <View className="flex gap-4">
          <CategoryCard
            title="Groceries"
            amountTransactions={12}
            category="groceries"
            iconComponente={<SimpleLineIcons name="basket" size={32} color="white" />}
            ClassnameIcon="bg-red-400"
            onEdit={() => {}}
            onDelete={()=>{}}
          />
          <CategoryCard
            title="Transport"
            amountTransactions={8}
            category="transport"
            iconComponente={<SimpleLineIcons name="badge" size={32} color="white" />}
            ClassnameIcon="bg-blue-400"
            onEdit={() => {}}
            onDelete={()=>{}}

          />
          <CategoryCard
            title="Entertainment"
            amountTransactions={5}
            category="entertainment"
            iconComponente={<SimpleLineIcons name="game-controller" size={32} color="white" />}
            ClassnameIcon="bg-green-400"
            onEdit={() => {}}
            onDelete={()=>{}}

          />
          <CategoryCard
            title="Utilities"
            amountTransactions={3}
            category="utilities"
            iconComponente={<SimpleLineIcons name="energy" size={32} color="white" />}
            ClassnameIcon="bg-yellow-400"
            onEdit={() => {}}
            onDelete={()=>{}}

          />
        </View>

        <View>
          <Button
            className="h-12 bg-teal-600 p-4 active:bg-teal-400"
            onPress={() => router.push('/(modal)/addcategory')}>
            <Text className="font-medium text-white h-5">Add Category</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default categories;
