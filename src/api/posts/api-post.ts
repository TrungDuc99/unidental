import axiosClient from '../common/axios-client';
import type { QueryParams, ResponseData, ResultData } from '../types';
import type { Posts } from './types';

export const PostsApi = {
  getAllPosts: (
    params: QueryParams
  ): Promise<ResponseData<ResultData<Posts>>> => {
    return axiosClient.get('/posts', { params });
  },
  getPostOne: (postId: string): Promise<ResponseData<Posts>> => {
    return axiosClient.get(`/posts/${postId}`);
  },
  getPostByUser: (userId: string): Promise<ResponseData<ResultData<Posts>>> => {
    return axiosClient.get(`/posts/${userId}`);
  },
  updatePosts: (params: Posts): Promise<ResponseData<Posts>> => {
    return axiosClient.post('/posts', params);
  },
  createPosts: (params: Posts): Promise<ResponseData<Posts>> => {
    return axiosClient.post('/posts', params);
  },
};
