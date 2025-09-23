import { Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  template: `
  <section class="py-16 bg-gray-50">
    <div class="container px-4 mx-auto">
      <div class="mb-12 text-center">
        <h2 class="mb-4 text-3xl font-bold text-gray-800">Why Choose TrimUrl?</h2>
        <p class="mx-auto max-w-2xl text-gray-600">Our powerful URL shortening service helps you create concise, trackable links for your marketing campaigns, social media, and more.</p>
        <button
        (click)="toggleFeatures()"
        class="flex items-center mx-auto mt-4 font-medium text-indigo-600 hover:text-indigo-800"
      >
        <span>{{ showFeatures() ? 'Hide Features' : 'Show Features' }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="ml-1 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" [class.rotate-180]="showFeatures()">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>

    @if (showFeatures()) {
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        @for (feature of features; track feature.title) {
          <div class="p-6 bg-white rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg">
            <div class="flex justify-center items-center mb-4 w-12 h-12 bg-indigo-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                @switch (feature.icon) {
                  @case ('bolt') {
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  }
                  @case ('chart-line') {
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  }
                  @case ('shield-check') {
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  }
                  @case ('user-check') {
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4" />
                  }
                  @default {
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  }
                }
              </svg>
            </div>
            <h3 class="mb-2 text-xl font-semibold text-gray-800">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        }
      </div>
    }
  </div>
  </section>
  `
})
export class FeaturesComponent {
  showFeatures = signal(false);
  features = [
    {
      title: 'Fast & Efficient',
      description: 'Generate short URLs instantly with our high-performance service',
      icon: 'bolt'
    },
    {
      title: 'Analytics',
      description: 'Track clicks and engagement with detailed analytics',
      icon: 'chart-line'
    },
    {
      title: 'Secure',
      description: 'Enterprise-grade security for your shortened links',
      icon: 'shield-check'
    },
    {
      title: 'Easy to Use',
      description: 'Simple, intuitive interface for quick URL shortening',
      icon: 'user-check'
    }
  ];

  toggleFeatures() {
    this.showFeatures.update(value => !value);
  }
}