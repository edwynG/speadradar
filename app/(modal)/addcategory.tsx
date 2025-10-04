import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import useSetStackTitle from '@/lib/utils';
import React from 'react';
import {  View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';





function addCategory() {
  useSetStackTitle('Add Category');
  return (
    <SafeAreaView edges={['bottom']} className="flex flex-1">
      <View className="flex flex-1 justify-between bg-white p-4 pb-4">
        <View>
          <View className="mb-4 flex gap-2">
            <Label nativeID="title" htmlFor="title" className="text-[#4D5766]">
              Category name
            </Label>
            <View className="relative h-min w-max">
              <Input
                id="title"
                keyboardType="default"
                textContentType="name"
                autoComplete="off"
                placeholder="E.g Health"
                className={
                  'text-md h-14 border border-gray-300 !bg-white px-3 text-gray-700 ' +
                  ' placeholder:text-gray-700'
                }
              />
            </View>
          </View>
        </View>

        <View>
          <Button className="bg-teal-600 p-4 active:bg-teal-400 h-12">
            <Text className="font-medium text-white h-5">Save Category</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default addCategory;
