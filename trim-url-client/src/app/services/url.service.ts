import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagedResult, UrlDto } from '../models/url.model';

@Injectable({ providedIn: 'root' })
export class UrlService {
  private readonly http = inject(HttpClient);
  private readonly base = '/api';

  getPagedUrls(pageIndex: number, pageSize: number, searchTerm?: string): Observable<PagedResult<UrlDto>> {
    let params = new HttpParams()
      .set('pageIndex', pageIndex)
      .set('pageSize', pageSize);

    if (searchTerm && searchTerm.trim().length > 0) {
      params = params.set('searchTerm', searchTerm.trim());
    }

    return this.http.get<PagedResult<UrlDto>>(`${this.base}/paged-urls`, { params });
  }
}


