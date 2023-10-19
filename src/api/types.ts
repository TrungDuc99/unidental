export interface PaginateQuery<T> {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
}
export interface ResponseData<T> {
  data: T;
  errors?: string[] | null;
  succeeded: boolean;
  message?: string;
}

export interface PaginationParams {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  hasPrevious: boolean;
  hasNext: boolean;
  [x: string]: any;
}

export interface ResultData<T> extends PaginationParams {
  data: T[];
}
export interface QueryParams {
  search?: string;
  pageNumber?: number | string;
  pageSize?: number | string;
  [x: string]: any;
}
export type TimeStamp = {
  created: Date;
  updated: Date;
};
export interface DefaultFile {
  path?: string;
  base64?: string;
  width?: number;
  height?: number;
  size?: number;
  name?: string;
  type?: string;
}
export type options = {
  label: string;
  value: any;
}[];
