import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import React, { useEffect, useState } from 'react';

import type { PaginationParams, QueryParams } from '@/api';
import { PostsApi } from '@/api/posts';
import { EmptyList, View } from '@/ui';

import { Card } from './card';

export const Feed = () => {
  const { navigate } = useNavigation();
  const [filters, setFilters] = useState<QueryParams>({
    pageNumber: 1,
    pageSize: 10,
    search: '',
    state: 1,
  });
  const [pagination, setPagination] = useState<PaginationParams>({
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
    totalCount: 1,
    hasPrevious: false,
    hasNext: false,
  });
  // const { data, isLoading, isError, refetch, fetchNextPag } = usePosts(
  //   filters,
  //   setPagination
  // );
  const [posts, setPosts] = useState<any>([]);

  const getPosts = async () => {
    const res = await PostsApi.getAllPosts({});
    if (res) {
      setPosts(res?.data ?? []);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);

  const renderItem = React.useCallback(
    ({ item }: { item: any }) => <Card {...item} navigate={navigate} />,
    []
  );
  console.log(posts);

  return (
    <View className="flex-1 ">
      <FlashList
        data={posts || []}
        renderItem={renderItem}
        keyExtractor={(_, index) => `item-${index}`}
        ListEmptyComponent={<EmptyList isLoading={false} />}
        estimatedItemSize={300}
      />
      {/* <FlatListAdvanced
        data={data?.pages?.flatMap((item) => item?.data?.data ?? []) ?? []}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{
          padding: Spacing(4),
          paddingTop: Spacing(1),
          // paddingBottom: Spacing(50),
        }}
        pagination={pagination}
        onLoadMore={fetchNextPage}
        onRefresh={refetch}
      /> */}
    </View>
  );
};
