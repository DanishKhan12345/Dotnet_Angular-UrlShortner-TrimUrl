export interface UrlRequest {
  longUrl: string;
}

export interface UrlResponse {
  isSuccess: boolean;
  statusCode: number;
  shortUrl: string | null;
  errorMessage: string | null;
}

export interface UrlDto {
  id: number;
  longUrl: string;
  shortUrl: string;
  createdAt: string;
}

export interface PagedUrlsResponse {
  data: UrlDto[];
  totalCount: number;
  pageIndex: number;
  pageSize: number;
  totalPages: number;
}

export interface AnalyticsResponse {
  totalClicks: number;
}
