// export type Post = {
//   userId: number;
//   id: number;
//   title: string;
//   body: string;

import type { TimeStamp } from '../types';

// };
export type Posts = {
  content: string;
  userId: string;
  title: string;
  image: any[];
  topic: string;
  countLike: number;
  countComment: number;
  countView: number;
  description: string;
};
export type PostsRes = TimeStamp &
  Posts & {
    _id: string;
  };
