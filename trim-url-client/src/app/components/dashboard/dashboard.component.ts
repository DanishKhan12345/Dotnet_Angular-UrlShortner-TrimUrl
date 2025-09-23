import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UrlService } from '../../services/url.service';
import { UrlDto } from '../../models/url.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private readonly urlService = inject(UrlService);

  heading = 'TrimURL Dashboard';
  toastMessage: string | null = null;

  // state
  urls = signal<UrlDto[]>([]);
  totalCount = signal(0);
  pageIndex = signal(1);
  pageSize = signal(10);
  searchTerm = signal('');
  loading = signal(false);
  errorMessage = signal<string | null>(null);
  private searchDebounce: any;

  totalPages = computed(() => {
    const count = this.totalCount();
    const size = this.pageSize();
    return Math.max(1, Math.ceil(count / size));
  });

  constructor() {
    // Initial fetch and react to paging only
    effect(() => {
      void this.pageIndex();
      void this.pageSize();
      this.fetch();
    });
  }

  fetch(): void {
    this.loading.set(true);
    this.errorMessage.set(null);
    this.urlService
      .getPagedUrls(this.pageIndex(), this.pageSize(), this.searchTerm())
      .subscribe({
        next: (res) => {
          this.urls.set(res.items);
          this.totalCount.set(res.totalCount);
          this.loading.set(false);
        },
        error: (err) => {
          this.urls.set([]);
          this.totalCount.set(0);
          this.loading.set(false);
          this.errorMessage.set('Failed to load URLs. Please ensure the API is running.');
        },
      });
  }

  onSearch(term: string): void {
    if (this.searchDebounce) {
      clearTimeout(this.searchDebounce);
    }
    this.searchDebounce = setTimeout(() => {
      this.pageIndex.set(1);
      this.searchTerm.set(term);
      this.fetch();
    }, 300);
  }

  onPageSizeChange(size: number): void {
    const parsed = Number(size) || 10;
    this.pageSize.set(parsed);
    this.pageIndex.set(1);
  }

  nextPage(): void {
    if (this.pageIndex() < this.totalPages()) {
      this.pageIndex.set(this.pageIndex() + 1);
    }
  }

  prevPage(): void {
    if (this.pageIndex() > 1) {
      this.pageIndex.set(this.pageIndex() - 1);
    }
  }

  async copyToClipboard(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      this.toastMessage = 'Short URL copied to clipboard';
      setTimeout(() => (this.toastMessage = null), 2000);
    } catch {
      // no-op
    }
  }
}


