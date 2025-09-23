import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlDto, UrlRequest, UrlResponse, PagedUrlsResponse, AnalyticsResponse } from '../models/url.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  /**
   * Shortens a long URL
   * @param longUrl The URL to shorten
   * @returns Observable with the response containing the shortened URL
   */
  shortenUrl(longUrl: string): Observable<UrlResponse> {
    const request: UrlRequest = { longUrl };
    return this.http.post<UrlResponse>(`${this.apiUrl}/short`, request);
  }

  /**
   * Gets all URLs
   * @returns Observable with all URLs
   */
  getAllUrls(): Observable<UrlDto[]> {
    return this.http.get<UrlDto[]>(`${this.apiUrl}/urls`);
  }

  /**
   * Gets paginated URLs with optional search term
   * @param pageIndex The page index (0-based)
   * @param pageSize The page size
   * @param searchTerm Optional search term
   * @returns Observable with paginated URLs
   */
  getPagedUrls(pageIndex: number, pageSize: number, searchTerm?: string): Observable<PagedUrlsResponse> {
    let params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());
    
    if (searchTerm) {
      params = params.set('searchTerm', searchTerm);
    }
    
    return this.http.get<PagedUrlsResponse>(`${this.apiUrl}/paged-urls`, { params });
  }

  /**
   * Gets analytics for a URL
   * @param urlCode The URL code
   * @returns Observable with analytics data
   */
  getAnalytics(urlCode: string): Observable<AnalyticsResponse> {
    return this.http.get<AnalyticsResponse>(`${this.apiUrl}/analytics/${urlCode}`);
  }
}

