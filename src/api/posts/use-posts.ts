import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

import type { PaginationParams, QueryParams } from '../types';
import { PostsApi } from './api-post';

export const useGetPosts = () => {
  return useQuery('getAllPost', () => PostsApi.getAllPosts({}), {
    onSuccess: (data) => {},
  });
};
export const useAddPost = () => {
  return useMutation(PostsApi.createPosts);
};
export const usePostsDetail = (postId: string) => {
  return useQuery(['PostsDetail', postId], () => {
    return PostsApi.getPostOne(postId);
  });
};
export const usePosts = (
  filters: QueryParams,
  setPagination: React.Dispatch<React.SetStateAction<PaginationParams>>
) => {
  return useInfiniteQuery(
    ['getPostList', filters],
    async ({ pageParam = 1 }) => {
      return PostsApi.getAllPosts({
        ...filters,
        pageNumber: pageParam,
      });
    },
    {
      onSuccess: (dataResult) => {
        if (dataResult) {
          const { pages } = dataResult;

          if (pages[0]) {
            const {
              currentPage,
              totalCount,
              pageSize,
              totalPages,
              next,
              previous,
            } = pages[0]?.data;

            setPagination({
              hasNext,
              hasPrevious,
              currentPage,
              next,
              previous,
              totalCount,
              pageSize,
              totalPages,
            });
          }
        }
      },
    }
  );
};
