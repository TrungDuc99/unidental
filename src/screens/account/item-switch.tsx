import * as React from 'react';
import { Switch } from 'react-native-ui-lib';

import type { TxKeyPath } from '@/core';
import { View } from '@/ui';
import colors from '@/ui/theme/colors';

import { Item } from './item';

interface SwitchItemProps {
  icon?: any;
  lable: TxKeyPath;
  onPress?: () => void;
}

export const SwitchItem = ({ onPress, icon, lable }: SwitchItemProps) => {
  const Icon: any = icon;
  return (
    <View className="flex flex-row justify-between">
      <Item
        icon={Icon && <Icon size={20} color={colors.primary[200]} />}
        text={lable}
        onPress={onPress}
      />
      <Switch />
    </View>
  );
};
