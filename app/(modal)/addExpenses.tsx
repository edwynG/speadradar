import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Text } from '@/components/ui/text';
import useSetStackTitle from '@/lib/utils';
import React, { useState } from 'react';
import { Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


const categories = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Blueberry', value: 'blueberry' },
];

function addExpenses() {
  useSetStackTitle('Add Expenses');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);


  const onChangeInputDate = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios'); // en iOS el picker queda visible
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <SafeAreaView edges={['bottom']} className='flex flex-1'>
      <View className="flex flex-1 justify-between bg-white p-4 pb-4">
        <View>
          <View className="mb-4 flex gap-2">
            <Label nativeID="amount" htmlFor="amount" className='text-[#4D5766]'>
              Amount
            </Label>
            <View className="relative h-min w-max">
              <Input
                id="amount"
                keyboardType="numeric"
                textContentType="flightNumber"
                autoComplete="off"
                placeholder="0.00"
                className={"h-16 border border-gray-300 !bg-white px-3 pl-9 text-3xl font-bold text-gray-700 " + "placeholder:text-gray-700"}
              />
              <Text className="absolute left-3 top-4 text-2xl font-semibold text-gray-500">$</Text>
            </View>
          </View>

          <View className="mb-4 flex gap-2">
            <Label nativeID="title" htmlFor="title" className='text-[#4D5766]'>
              Title
            </Label>
            <View className="relative h-min w-max">
              <Input
                id="title"
                keyboardType="default"
                textContentType="name"
                autoComplete="off"
                placeholder="E.g Coffe with a friend"
                className={"text-md h-14 border border-gray-300 !bg-white px-3 text-gray-700 " + "  placeholder:text-gray-700"}
              />
            </View>
          </View>

          <View className="mb-4 flex gap-2">
            <Label nativeID="title" htmlFor="category" className='text-[#4D5766]'>
              Category
            </Label>
            <Select className="text-black">
              <SelectTrigger className="h-14 border border-gray-300 !bg-white px-3">
                <SelectValue placeholder="Select a category" className="text-md text-gray-700" />
              </SelectTrigger>
              <SelectContent className="w-[91%]  text-black">
                <SelectGroup>
                  <SelectLabel className="">Categories</SelectLabel>
                  {categories.map(({ label, value }) => (
                    <SelectItem key={value} label={label} value={value} >
                      <Text>{label}</Text>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </View>

          <View className="mb-4 flex gap-2">
            <Label nativeID="title" htmlFor="date" className='text-[#4D5766]'>
              Date
            </Label>
            <View className="relative h-min w-max">
              <Input
                id="date"
                keyboardType="default"
                textContentType="birthdate"
                showSoftInputOnFocus={false}
                placeholder="Date of expenditure"
                caretHidden={true}
                onPress={()=> setShowPicker(true)}
                value={date.toLocaleDateString()}
                className={"text-md h-14 border border-gray-300 !bg-white px-3 relative text-gray-700 " + "placeholder:text-gray-700"}
              />
              <MaterialIcons name="date-range" size={28} color="black" className='absolute right-0 top-[18%] mr-4'/>
            </View>
          </View>
        </View>

        <View>
          <Button className=" bg-teal-600 p-4 active:bg-teal-400 h-12">
            <Text className="text-white font-medium h-5">Save Expense</Text>
          </Button>
        </View>
      </View>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChangeInputDate}
        />
      )}
    </SafeAreaView>
  );
}

export default addExpenses;
