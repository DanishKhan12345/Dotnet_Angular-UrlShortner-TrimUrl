import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [CommonModule],
  template: `
  <section class="py-16 text-white bg-indigo-600">
  <div class="container px-4 mx-auto text-center">
    <h2 class="mb-6 text-3xl font-bold">Ready to manage your shortened URLs?</h2>
    <p class="mx-auto mb-8 max-w-2xl text-xl">Access your dashboard to view analytics, manage links, and get detailed insights.</p>
    <button
      (click)="goToDashboard()"
      class="px-8 py-3 font-semibold text-indigo-600 bg-white rounded-lg transition duration-300 ease-in-out hover:bg-indigo-50"
    >
      Go to Dashboard
    </button>
  </div>
</section>
  `
})
export class CtaComponent {
  private router = inject(Router);
  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}