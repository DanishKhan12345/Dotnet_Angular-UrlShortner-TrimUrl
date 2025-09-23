export interface UrlDto {
  id: number;
  longUrl: string;
  shortUrl: string;
  createdAt: string; // ISO string from backend
}

export interface PagedResult<T> {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  items: T[];
}


