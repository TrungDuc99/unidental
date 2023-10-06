import { Colors } from '@configs';
import { Text } from '@ui/Text';
import { NoData } from '@ui/icons';
import React from 'react';
import { ActivityIndicator } from 'react-native';

import { View } from 'react-native-ui-lib';

type Props = {
  isLoading: boolean;
};
export const EmptyList = React.memo(({ isLoading }: Props) => {
  return (
    <View
      style={{
        minHeight: 400,
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className="min-h-[400px] flex-1 items-center justify-center"
    >
      {!isLoading ? (
        <View>
          <NoData />
          <Text
            style={{
              paddingTop: 4,
              textAlign: 'center',
              color: '#f98132',
            }}
          >
            Xin lỗi! Không có phiếu yêu cầu nào
          </Text>
        </View>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
});
