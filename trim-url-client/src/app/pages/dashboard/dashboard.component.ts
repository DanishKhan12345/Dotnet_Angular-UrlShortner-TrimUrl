import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UrlStore } from '../../store/url.store';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { AnalyticsResponse } from '../../models/url.model';
import { UrlService } from '../../services/url.service';
import { HeaderComponent } from './components/header.component';
import { SearchComponent } from "./components/search.component";
import { ErrorComponent } from '../../shared/components/error.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ClipboardModule, HeaderComponent, SearchComponent, ErrorComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  // protected urlStore = inject(UrlStore);
  protected urlStore = inject(UrlStore) as any;

  private router = inject(Router);
  private urlService = inject(UrlService);

  // Signals for reactive state
  protected searchTerm = signal<string>('');
  protected copiedUrl = signal<string | null>(null);
  protected selectedUrlCode = signal<string | null>(null);
  protected totalClicks = signal<number | null>(null);

  // Computed values
  protected pageNumbers = computed(() => {
    if (!this.urlStore.pagedUrls()) return [];

    const totalPages = this.urlStore.pagedUrls()?.totalPages || 1;
    return Array.from({ length: totalPages }, (_, i) => i);
  });

  // Search debounce
  private searchSubject = toObservable(this.searchTerm);

  constructor() {
    // Set up search debounce
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntilDestroyed()
    ).subscribe(term => {
      this.urlStore.updateSearchTerm(term || null);
    });
  }

  ngOnInit(): void {
    // Load initial data
    this.urlStore.loadPagedUrls();
  }

  // Handle pagination
  onPageChange(pageIndex: number): void {
    this.urlStore.updatePagination(pageIndex, this.urlStore.pageSize());
  }

  // Copy URL to clipboard
  copyToClipboard(url: string): void {
    this.copiedUrl.set(url);
    setTimeout(() => this.copiedUrl.set(null), 2000);
  }

  // View analytics for a URL
  viewAnalytics(urlCode: string): void {
    this.selectedUrlCode.set(urlCode);

    // Get analytics data
    this.urlService.getAnalytics(urlCode).subscribe({
      next: (data: AnalyticsResponse) => {
        this.totalClicks.set(data.totalClicks);
      },
      error: () => {
        this.totalClicks.set(0);
      }
    });
  }

  // Close analytics modal
  closeAnalytics(): void {
    this.selectedUrlCode.set(null);
    this.totalClicks.set(null);
  }

  // Navigate back to home
  goToHome(): void {
    this.router.navigate(['/']);
  }
}
