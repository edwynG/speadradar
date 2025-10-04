import { Input } from '@/components/ui/input';
import useSetStackTitle from '@/lib/utils';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import Octicons from '@expo/vector-icons/Octicons';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

interface CategoryCardProps {
  titleExpense: string;
  category: string;
  iconComponente: React.ReactElement;
  amount?: number;
  ClassnameIcon?: string;
  hours?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  titleExpense,
  category,
  iconComponente,
  amount = 0,
  ClassnameIcon,
  hours,
}) => {
  return (
    <View className="h-20 flex-row items-center justify-between rounded-md bg-[#F3F4F6] p-2 pr-4">
      <View className="flex-row items-center justify-center gap-4">
        <View className={'rounded-full p-4  ' + ClassnameIcon}>{iconComponente}</View>
        <View>
          <Text className="text-lg font-medium text-black">{category}</Text>
          <Text className="font-light text-gray-500">{titleExpense}</Text>
        </View>
      </View>

      <View className="flex-col gap-1">
        <Text className="text-right font-bold">${amount}</Text>
        <Text className="text-right text-gray-600">{hours}</Text>
      </View>
    </View>
  );
};

function histories() {
  useSetStackTitle('Expense history');
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 gap-6 bg-white p-4">
        <View className="flex gap-4">
          <View className="relative">
            <Input
              placeholder="Search history..."
              keyboardType="default"
              textContentType="name"
              className="h-14 rounded-md !bg-[#F3F4F6] pl-12"
              autoComplete="off"
            />
            <Octicons name="search" size={24} color="black" className="absolute left-4 top-4" />
          </View>
          <View className="flex flex-row items-center justify-between gap-4">
            <View className="flex flex-row gap-2">
              <Select>
                <SelectTrigger className="h-[50px] w-32 !bg-[#F3F4F6]">
                  <SelectValue placeholder="May 2024" />
                </SelectTrigger>
                <SelectContent className="w-32">
                  <SelectGroup>
                    <SelectLabel>Month</SelectLabel>
                    <SelectItem label="May" value="May" />
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-22 h-[50px] !bg-[#F3F4F6]">
                  <SelectValue placeholder="2024" />
                </SelectTrigger>
                <SelectContent className="w-22">
                  <SelectGroup>
                    <SelectLabel>Year</SelectLabel>
                    <SelectItem label="2023" value="2023" />
                    <SelectItem label="2024" value="2024" />
                  </SelectGroup>
                </SelectContent>
              </Select>
            </View>

            <View>
              <Select className=''>
                <SelectTrigger className="h-[50px] w-[70px]  !bg-[#F3F4F6]">
                  <Text className='text-gray-500'>Sort</Text>
                </SelectTrigger>
                <SelectContent className="w-[75px]">
                  <SelectGroup>
                    <SelectLabel >Sort by</SelectLabel>
                    <SelectItem  className='flex-1' label="A-Z" value="May" />
                    <SelectItem  className='flex-1' label="Z-A" value="May" />
                  </SelectGroup>
                </SelectContent>
              </Select>
            </View>
          </View>
        </View>

        <View className="flex gap-4">
          <View className="flex gap-2">
            <Text className="font-semibold text-gray-600">Today</Text>
            <View className="flex gap-4">
              <CategoryCard
                titleExpense="Supermarket shopping"
                category="Groceries"
                amount={76.45}
                hours="10:15 AM"
                iconComponente={<SimpleLineIcons name="badge" size={32} color="white" />}
                ClassnameIcon="bg-green-400"
              />
              <CategoryCard
                titleExpense="Bus fare"
                category="Transport"
                amount={2.5}
                hours="08:30 AM"
                iconComponente={<SimpleLineIcons name='basket' size={32} color="white" />}
                ClassnameIcon="bg-blue-400"
              />
            </View>
          </View>

          <View className="flex gap-2">
            <Text className="font-semibold text-gray-600">Yesterday</Text>
            <View className="flex gap-4">
              <CategoryCard
                titleExpense="Supermarket shopping"
                category="Groceries"
                amount={76.45}
                hours="10:15 AM"
                iconComponente={<SimpleLineIcons name='calendar' size={32} color="white" />}
                ClassnameIcon="bg-green-400"
              />
              <CategoryCard
                titleExpense="Bus fare"
                category="Transport"
                amount={2.5}
                hours="08:30 AM"
                iconComponente={<SimpleLineIcons name='bubbles' size={32} color="white" />}
                ClassnameIcon="bg-blue-400"
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default histories;
