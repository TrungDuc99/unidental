import axiosClient from '../common/axios-client';
import type { ResponseData, ResultData } from '../types';
import type { Posts, PostsRes } from './types';

export const PostsApi = {
  getAllPosts: (params: any): Promise<ResponseData<ResultData<PostsRes>>> => {
    return axiosClient.get('/posts');
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
