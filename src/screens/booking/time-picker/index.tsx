/* eslint-disable max-lines-per-function */

import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import { TIMES_MORNING } from '@/constant/booking';
import { Text, View } from '@/ui';
import Divider from '@/ui/core/drivider';

import type { itemProps } from './time-item';
import TimeItem from './time-item';

const TimePicker = () => {
  const styles = StyleSheet.create({
    container: {
      marginHorizontal: 20,
    },
    dot: {
      width: 7,
      height: 7,
      marginTop: 10,
      borderRadius: 1000,
      backgroundColor: '#FACF50',
    },
    timeOfDay: {
      flexDirection: 'row',
    },
    timeLine: {
      alignItems: 'center',
      marginRight: 10,
    },
  });

  const [morningTimeList, setMorningTimeList] =
    useState<itemProps[]>(TIMES_MORNING);

  const onSelectTime = (data: itemProps) => {
    const newTimeListSelected = morningTimeList.map((time) => ({
      ...time,
      active:
        time.id === data.id
          ? time.active === 2
            ? 2
            : 1
          : time.active === 2
          ? 2
          : 0,
    }));

    setMorningTimeList(newTimeListSelected);
  };

  return (
    <View style={styles.container}>
      <View style={styles.timeOfDay}>
        <View style={styles.timeLine}>
          <View style={styles.dot} />
          <Divider height={100} orientation={'vertical'} />
        </View>
        <View>
          <Text className={'font-semibold'}>Morning</Text>
          <View
            style={{
              flexDirection: 'row',

              flexWrap: 'wrap',
            }}
          >
            {morningTimeList.map((time, index) => {
              if (time.timeLine === 'morning')
                return (
                  <TimeItem onPress={onSelectTime} index={index} item={time} />
                );
            })}
          </View>
        </View>
      </View>
      <View style={styles.timeOfDay}>
        <View style={styles.timeLine}>
          <View style={styles.dot} />
          <Divider height={100} orientation={'vertical'} />
        </View>
        <View>
          <Text className={'font-semibold'}>Morning</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {morningTimeList.map((time, index) => {
              if (time.timeLine === 'afternoon')
                return (
                  <TimeItem onPress={onSelectTime} index={index} item={time} />
                );
            })}
          </View>
        </View>
      </View>
    </View>
  );
};

export default TimePicker;
