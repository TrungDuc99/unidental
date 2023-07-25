import React from 'react';

import { ScrollView, View } from '@/ui';
import BackTopBar from '@/ui/core/back-top-bar';

import DatePickerList from './date-picker-list';
import TimePicker from './time-picker';

export const Booking = () => {
  return (
    <View>
      <BackTopBar title="Đặt lịch" />

      <ScrollView>
        <View className="flex-1 ">
          <DatePickerList />
          <TimePicker />
        </View>
      </ScrollView>
    </View>
  );
};
