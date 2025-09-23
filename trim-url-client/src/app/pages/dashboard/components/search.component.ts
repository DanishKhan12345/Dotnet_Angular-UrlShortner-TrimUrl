import { Component, model } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  template: `
      <div class="p-6 mb-8 bg-white rounded-lg shadow-md">
    <div class="flex flex-col gap-4 justify-between items-center md:flex-row">
      <h2 class="text-xl font-semibold text-gray-800">Your Shortened URLs</h2>

      <div class="relative w-full md:w-64">
        <input
          type="text"
          [value]="searchTerm()"
          (input)="onSearch($any($event.target).value)"
          placeholder="Search URLs..."
          class="px-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
        >
        @if (searchTerm()) {
          <button
            (click)="onSearch('')"
            class="absolute right-3 top-1/2 text-gray-400 transform -translate-y-1/2 hover:text-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </button>
        }
      </div>
    </div>
  </div>
  `,
})
export class SearchComponent {
  searchTerm = model<string>();

  onSearch(term: string): void {
    this.searchTerm.set(term);
  }
}