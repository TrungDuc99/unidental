import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, TouchableOpacity } from '@/ui';

export type itemProps = {
  time: string;
  id: string;
  active: number;
  timeLine: string;
};
interface TimeItemProps {
  index: number;
  onPress: (item: itemProps) => void;
  item: itemProps;
}

const TimeItem = ({ item, onPress, index }: TimeItemProps) => {
  const styles = StyleSheet.create({
    container: {},
    timeBox: {
      display: 'flex',
      backgroundColor:
        item.active === 1 ? '#E9F3FF' : item.active === 2 ? '#F1F1F1' : 'white',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10,
      padding: 9,
      width: '20%',
      marginRight: 10,
      borderWidth: 1,
      borderColor: item.active === 1 ? '#53A6FF' : 'white',
      borderRadius: 14,
    },
  });
  return (
    <TouchableOpacity
      key={index}
      onPress={() => {
        if (item.active !== 2) {
          onPress(item);
        }
      }}
      disabled={item.active === 2}
      style={styles.timeBox}
    >
      <Text
        className={`font-medium ${
          item.active === 2
            ? 'text-[#959599]'
            : item.active === 1
            ? 'text-[#288EFE]'
            : 'text-textprimary-100'
        } `}
        variant="sm"
      >
        {item.time}
      </Text>
    </TouchableOpacity>
  );
};

export default TimeItem;
