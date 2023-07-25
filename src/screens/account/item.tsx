import * as React from 'react';

import type { TxKeyPath } from '@/core';
import { ArrowRight, Text, TouchableOpacity, View } from '@/ui';

type ItemProps = {
  text: TxKeyPath;
  value?: string;
  onPress?: () => void;
  icon?: React.ReactNode;
};

export const Item = ({ text, value, icon, onPress }: ItemProps) => {
  const isPressable = onPress !== undefined;
  const Container = isPressable ? TouchableOpacity : View;
  return (
    <Container
      onPress={onPress}
      className="flex-1 flex-row items-center justify-between px-2 py-1.5"
    >
      <View className="flex-row items-center">
        {icon && <View className="pr-2">{icon}</View>}
        <Text variant="sm" className="text-neutral-300" tx={text} />
      </View>
      <View className="flex-row items-center">
        <Text variant="xs" className="text-neutral-200  dark:text-white">
          {value}
        </Text>
        {isPressable && (
          <View className="pl-2">
            <ArrowRight />
          </View>
        )}
      </View>
    </Container>
  );
};
