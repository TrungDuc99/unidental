import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Spacing } from '@/configs';

import { Pressable } from '../pressable';
import { Text } from '../text';

export type Tab = {
  label: string;
  value: string;
};

interface TabItemProps {
  item: Tab;
  tabsLength: number;
  index: number;
  onPress: (event: Tab) => void;
  tabCurrent: Tab;
}

const TabItem = ({
  onPress,
  item,
  index,
  tabCurrent,
  tabsLength,
}: TabItemProps) => {
  const styles = StyleSheet.create({
    container: {
      marginRight: index < tabsLength - 1 ? Spacing(2) : 0,
      paddingHorizontal: 8,
      paddingVertical: 8,
      borderRadius: 12,
      backgroundColor:
        Number(tabCurrent) === Number(item.value) ? '#FBCE4F' : '#F1F1F1',
    },
  });
  return (
    <Pressable style={styles.container} onPress={() => onPress(item)}>
      <Text className="text-center font-medium" variant="sm">
        {item.label}
      </Text>
    </Pressable>
  );
};

export default TabItem;
