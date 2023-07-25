import React from 'react';

import type { TxKeyPath } from '@/core';
import { Text, View } from '@/ui';

type Props = {
  children: React.ReactNode;
  title?: TxKeyPath;
};

export const ItemsContainer = ({ children, title }: Props) => {
  return (
    <>
      {title && (
        <Text variant="md" className="pt-3 pb-2 font-bold" tx={title} />
      )}
      {
        <View className="  dark:border-charcoal-700 dark:bg-charcoal-800">
          {children}
        </View>
      }
    </>
  );
};
