import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text } from '@/ui';
import { CardBase } from '@/ui/core/card-base';
import { ViewLinear } from '@/ui/core/view-linear-gradient';

interface DateItemProps {
  item: {
    id: number;
    fullDate: string;
    thu: string;
    date: number;
    isSelected: boolean;
  };
  onPress?: (data: any) => void;
}

const DateItem = (props: DateItemProps) => {
  const { item, onPress } = props;

  const onSelected = (id: any) => {
    onPress && onPress({ id: id, item: item });
  };
  return (
    <CardBase
      key={item.fullDate}
      style={styles.container}
      onPress={() => onSelected(item.id)}
    >
      <ViewLinear
        start={{ x: 0, y: 1 }}
        end={{ x: 1.2, y: 0 }}
        style={{
          borderRadius: 12,
          width: 60,
          padding: 10,
        }}
        colors={['#218AFF', '#8EC3FF']}
        colors={item.isSelected ? ['#218AFF', '#8EC3FF'] : ['#ffff', '#ffff']}
      >
        <Text
          variant="h2"
          className={`text-center font-bold  ${
            item.isSelected ? 'text-white' : 'text-textprimary-100'
          } `}
          style={styles.textDate}
        >
          {item.date}
        </Text>
        <Text
          variant="xs"
          className={`text-center font-bold ${
            item.isSelected ? 'text-white' : 'text-textprimary-100'
          }`}
        >
          {item.thu}
        </Text>
      </ViewLinear>
    </CardBase>
  );
};

export default DateItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    marginRight: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textDate: {},
});
