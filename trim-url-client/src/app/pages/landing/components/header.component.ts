import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";   
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="text-white bg-indigo-600">
      <div class="container px-4 py-6 mx-auto">
        <div class="flex flex-col justify-between items-center md:flex-row">
          <div class="flex items-center mb-4 md:mb-0">
            <h1 class="text-2xl font-bold">TrimUrl Dashboard</h1>
          </div>
          <div class="flex space-x-4">
        <button
          (click)="goToHome()"
          class="px-4 py-2 font-medium text-indigo-600 bg-white rounded-lg transition duration-300 ease-in-out hover:bg-indigo-50"
        >
          Back to Home
        </button>
      </div>
    </div>
  </div>
</header>
  `
})
export class HeaderComponent {
  private router = inject(Router);
  goToHome() {
    this.router.navigate(['/']);
  }
}