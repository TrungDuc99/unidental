import axiosClient from '../common/axios-client';
import type { ResponseData, ResultData } from '../types';
import type { Posts, PostsRes } from './types';

export const PostsApi = {
  getAllPosts: (params: any): Promise<ResponseData<ResultData<PostsRes>>> => {
    console.log('=================asdasd===================');
    console.log(axiosClient.get('/posts'));
    console.log('====================================');
    return axiosClient.get('/posts');
  },
  getPostOne: (postId: string): Promise<ResponseData<PostsRes>> => {
    return axiosClient.get(`/posts/${postId}`);
  },
  getPostByUser: (
    userId: string
  ): Promise<ResponseData<ResultData<PostsRes>>> => {
    return axiosClient.get(`/posts/${userId}`);
  },
  updatePosts: (params: Posts): Promise<ResponseData<PostsRes>> => {
    return axiosClient.post('/posts', params);
  },
  createPosts: (params: Posts): Promise<ResponseData<PostsRes>> => {
    return axiosClient.post('/posts', params);
  },
};
