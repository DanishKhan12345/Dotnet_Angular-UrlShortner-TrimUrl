import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UrlStore } from '../../store/url.store';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { UrlResponse } from '../../models/url.model';
import { FooterComponent } from './components/footer.component';
import { FeaturesComponent } from './components/features.component';
import { CtaComponent } from './components/cta.component';
import { ErrorComponent } from '../../shared/components/error.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ClipboardModule, FooterComponent, FeaturesComponent, ErrorComponent, CtaComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  protected urlStore = inject(UrlStore);
  protected currentYear = new Date().getFullYear();

  // Use signals for reactive state
  protected copied = signal(false);
  protected showFeatures = signal(false);
  protected currentUrlObs = toObservable(this.urlStore.currentUrl);

  // Create form with validators
  protected urlForm = this.fb.group({
    longUrl: ['', [Validators.required, Validators.pattern('https?://.*')]]
  });

  constructor() {
    // Subscribe to store changes and handle side effects
    this.currentUrlObs
      .pipe(takeUntilDestroyed())
      .subscribe((url: UrlResponse | null) => {
        if (url?.isSuccess) {
          this.urlForm.reset();
        }
      });
  }

  // Submit handler for the form
  onSubmit(): void {
    if (this.urlForm.valid) {
      const longUrl = this.urlForm.get('longUrl')?.value as string;
      this.urlStore.shortenUrl(longUrl);
    } else {
      this.urlForm.markAllAsTouched();
    }
  }

  // Copy URL to clipboard
  copyToClipboard(): void {
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }

  // Toggle features section
  toggleFeatures(): void {
    this.showFeatures.update(value => !value);
  }

  // Navigate to dashboard
  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
