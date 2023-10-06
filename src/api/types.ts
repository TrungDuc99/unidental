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
