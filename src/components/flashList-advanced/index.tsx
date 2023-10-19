import { useScrollToTop } from '@react-navigation/native';
import React from 'react';
import type { FlatListProps } from 'react-native';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { Colors, View } from 'react-native-ui-lib';

import type { PaginationParams } from '@/api';
import { ScaleSize, Spacing } from '@/configs';
import { colors, Text } from '@/ui';

export interface FlatListBaseProps<T> extends FlatListProps<T> {
  data: T[];
  pagination: PaginationParams;
  refreshing?: boolean;
  onRefresh?: () => void;
  onLoadMore?: () => void;
  isFetchingNextPage?: boolean;
}
const FlatListAdvanced = <T extends unknown>({
  data,
  onLoadMore,
  pagination,
  onRefresh,
  refreshing = false,
  isFetchingNextPage = false,
  ...rest
}: FlatListBaseProps<T>) => {
  const ref = React.useRef<any>(null);
  useScrollToTop(ref);
  const { currentPage, totalPages } = pagination;
  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        {isFetchingNextPage ? ( //<Text style={styles.text} children="--- Hết dữ liệu ---" />
          <ActivityIndicator color={colors.primary[200]} size="large" />
        ) : data.length === 0 ? (
          <Text className=" mt-2 font-semibold">Không có dữ liệu</Text>
        ) : (
          <Text className="mt-2 font-semibold">Hết dữ liệu</Text>
        )}
      </View>
    );
  };
  const handleLoadMore = () => {
    if (onLoadMore) {
      onLoadMore();
    }
  };
  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    }
  };

  return (
    <FlatList
      {...rest}
      ref={ref}
      data={data}
      keyExtractor={(item: any, index) => index.toString()}
      // contentContainerStyle={{padding: Spacing(4), paddingTop: Spacing(2)}}
      refreshControl={
        <RefreshControl
          colors={[Colors.primaryColor]}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      }
      onEndReached={() => {
        currentPage < totalPages && handleLoadMore();
      }}
      removeClippedSubviews
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

export default FlatListAdvanced;

const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    marginVertical: Spacing(1),
  },
  text: {
    color: Colors.textColor,
  },
  textError: {
    color: Colors.errorColor,
    fontSize: ScaleSize(12),
  },
  separator: {
    height: Spacing(4),
  },
});
