/* eslint-disable max-lines-per-function */
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';

import type { PaginationParams, QueryParams } from '@/api';
import type { PostsRes } from '@/api/posts';
import { usePosts } from '@/api/posts';
import FlatListAdvanced from '@/components/flashList-advanced';
import { View } from '@/ui';

import { Card } from './card';
import SkeletonPost from './skeleton-loading';

export const Feed = () => {
  const { navigate } = useNavigation();
  const [filters, setFilters] = useState<QueryParams>({
    pageNumber: 1,
    pageSize: 10,
    search: '',
    state: 1,
  });
  const [pagination, setPagination] = useState<PaginationParams>({
    currentPage: 0,
    totalPages: 1,
    pageSize: 10,
    totalCount: 1,
    hasPrevious: false,
    hasNext: false,
  });
  const { data, isLoading, isError, refetch, fetchNextPage } = usePosts(
    filters,
    setPagination
  );
  console.log('============pagination========================');
  console.log(pagination);
  console.log('====================================');
  // const [posts, setPosts] = useState<any>([]);

  // const getPosts = async () => {
  //   const res = await PostsApi.getAllPosts({});
  //   if (res) {
  //     setPosts(res?.data ?? []);
  //   }
  // };
  // useEffect(() => {
  //   getPosts();
  // }, []);

  const renderItem = React.useCallback(
    ({ item }: { item: any }) => <Card {...item} navigate={navigate} />,
    []
  );

  return (
    <View className="flex-1 ">
      {true ? (
        <View className="flex">
          <SkeletonPost />
        </View>
      ) : (
        <FlatListAdvanced
          data={data?.pages?.flatMap((item) => item?.data?.data ?? []) ?? []}
          keyExtractor={(item: PostsRes) => item._id.toString()}
          renderItem={renderItem}
          pagination={pagination}
          onLoadMore={() => {
            setFilters({
              ...filters,
              ...pagination.next,
            });
          }}
          onRefresh={refetch}
        />
      )}
      <FlatListAdvanced
        data={data?.pages?.flatMap((item) => item?.data?.data ?? []) ?? []}
        keyExtractor={(item: PostsRes) => item._id.toString()}
        renderItem={renderItem}
        pagination={pagination}
        onLoadMore={() => {
          setFilters({
            ...filters,
            ...pagination.next,
          });
        }}
        onRefresh={refetch}
      />
    </View>
  );
};
