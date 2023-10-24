// export type Post = {
//   userId: number;
//   id: number;
//   title: string;
//   body: string;

export type Posts = {
  _id?: string;
  content: string;
  userId: string;
  title: string;
  image?: any[];
  topic?: string;
  countLike?: number;
  countComment?: number;
  countView?: number;
  description: string;
  created?: Date;
  updated?: Date;
};
export type PostsRes = {
  _id: string;
  content: string;
  userId: string;
  title: string;
  image?: any[];
  topic?: string;
  countLike?: number;
  countComment?: number;
  countView?: number;
  description: string;
  created?: Date;
  updated?: Date;
};
