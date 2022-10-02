export interface PaginationModel<T> {
  page: number;
  data: T;
  totalPages: number;
  totalResults: number;
}
