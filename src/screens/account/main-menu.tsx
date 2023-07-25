import { CalendarTick, DocumentText, Image } from 'iconsax-react-native';
import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, TouchableOpacity, View } from '@/ui';
import { CardBase } from '@/ui/core/card-base';

const MainMenu = () => {
  return (
    <View className="mt-5" style={styles.container}>
      <CardBase className="p-4">
        <View className="flex flex-row items-center justify-between">
          <View className="flex items-center justify-center">
            <TouchableOpacity className="flex h-10 w-10 items-center justify-center rounded-full bg-[#CDE5E4] p-2">
              <CalendarTick color="#479D9A" variant="Bulk" />
            </TouchableOpacity>

            <Text className="mt-1 font-medium" variant="xs">
              Đếm ngày
            </Text>
          </View>
          <View className="flex items-center justify-center">
            <TouchableOpacity className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFD7CC] p-2">
              <Image color="#FFB8A6" variant="Bold" />
            </TouchableOpacity>

            <Text className="mt-1 font-medium" variant="xs">
              Kỷ niệm
            </Text>
          </View>
          <View className="flex items-center justify-center">
            <TouchableOpacity className="flex h-10 w-10 items-center justify-center rounded-full bg-[#CDE5E4] p-2">
              <DocumentText color="#479D9A" variant="Bulk" />
            </TouchableOpacity>

            <Text className="mt-1 font-medium" numberOfLines={2} variant="xs">
              Hợp đồng
            </Text>
          </View>
        </View>
      </CardBase>
    </View>
  );
};

export default MainMenu;

const styles = StyleSheet.create({
  container: {},
});
