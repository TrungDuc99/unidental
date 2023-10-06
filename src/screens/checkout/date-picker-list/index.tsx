import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { getDaysInMonth } from '@/core';

import DateItem from './item-date';

interface DatePickerListProps {
  onSelectedDate: (date: any) => void;
}

const DatePickerList = ({ onSelectedDate }: DatePickerListProps) => {
  const scrollViewRef = useRef<ScrollView>(null); // Create a reference for the ScrollView
  const [dateOfMonth, setDateOfMonth] = useState<
    {
      id: any;
      fullDate: string;
      thu: string;
      date: number;
      isSelected: boolean;
    }[]
  >([]);

  useEffect(() => {
    const currentDate = new Date();
    const daysInMonth = getDaysInMonth(
      currentDate.getMonth() + 1,
      currentDate.getFullYear(),
      currentDate.getDate()
    );
    setDateOfMonth(daysInMonth);

    // Scroll to the current date after the component is rendered
    if (scrollViewRef.current) {
      setTimeout(() => {
        const itemIndex = daysInMonth.findIndex(
          (day) => day.date === currentDate.getDate()
        );
        if (itemIndex !== -1) {
          scrollViewRef.current!.scrollTo({ x: itemIndex * 60 });
        }
      }, 100);
    }
  }, []);

  const onSelectionChanged = (data: any) => {
    const updatedDates = dateOfMonth.map((d) => ({
      ...d,
      isSelected: d.id === data.id,
    }));
    onSelectedDate(data.item);
    setDateOfMonth(updatedDates);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef} // Assign the reference to the ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {dateOfMonth.map((date) => {
          return (
            <View key={date.id} style={styles.dateList}>
              <DateItem item={date} onPress={onSelectionChanged} />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default DatePickerList;
const styles = StyleSheet.create({
  container: {},
  dateList: {
    marginVertical: 20,
  },
});
