import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, finalize, pipe, switchMap, tap } from 'rxjs';
import { UrlResponse, PagedUrlsResponse } from '../models/url.model';
import { UrlService } from '../services/url.service';

export interface UrlState {
  pagedUrls: PagedUrlsResponse | null;
  currentUrl: UrlResponse | null;
  loading: boolean;
  error: string | null;
  searchTerm: string | null;
  pageIndex: number;
  pageSize: number;
}

const initialState: UrlState = {
  pagedUrls: null,
  currentUrl: null,
  loading: false,
  error: null,
  searchTerm: null,
  pageIndex: 1,
  pageSize: 10
};

export const UrlStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ pagedUrls, loading, error }) => ({
    hasUrls: computed(() => pagedUrls()!.data?.length > 0),
    totalUrls: computed(() => pagedUrls()?.totalCount || 0),
    isLoading: computed(() => loading()),
    hasError: computed(() => !!error()),
  })),
  withMethods((store) => {
    const urlService = inject(UrlService);

    return {
      shortenUrl: rxMethod<string>(
        pipe(
          tap(() => patchState(store, { loading: true, error: null })),
          switchMap((longUrl) =>
            urlService.shortenUrl(longUrl).pipe(
              tap((response) => {
                if (response.isSuccess) {
                  patchState(store, { currentUrl: response });
                } else {
                  patchState(store, { error: response.errorMessage || 'Failed to shorten URL' });
                }
              }),
              catchError((err) => {
                patchState(store, { error: err.message || 'An error occurred' });
                throw err;
              }),
              finalize(() => patchState(store, { loading: false }))
            )
          )
        )
      ),

      loadPagedUrls: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { loading: true, error: null })),
          switchMap(() =>
            urlService.getPagedUrls(
              store.pageIndex(),
              store.pageSize(),
              store.searchTerm() || undefined
            ).pipe(
              tap((pagedUrls) => patchState(store, { pagedUrls })),
              catchError((err) => {
                patchState(store, { error: err.message || 'Failed to load paged URLs' });
                throw err;
              }),
              finalize(() => patchState(store, { loading: false }))
            )
          )
        )
      ),

      updatePagination(pageIndex: number, pageSize: number) {
        patchState(store, { pageIndex, pageSize });
        this.loadPagedUrls();
      },

      updateSearchTerm(searchTerm: string | null) {
        patchState(store, { searchTerm, pageIndex: 1 });
        this.loadPagedUrls();
      },

      clearCurrentUrl() {
        patchState(store, { currentUrl: null });
      },

      clearError() {
        patchState(store, { error: null });
      }
    };
  })
);
