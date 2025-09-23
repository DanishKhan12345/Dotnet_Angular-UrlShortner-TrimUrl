import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule],
  template: `
      <div class="px-4 py-3 mb-6 text-red-700 bg-red-100 rounded-lg border border-red-400">
        <div class="flex">
          <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ errorMessage }}</span>
        </div>
        <button
          (click)="clear()"
          class="mt-1 text-sm underline"
        >
          Dismiss
        </button>
      </div>
  `,
})
export class ErrorComponent {
  @Input() errorMessage: string | null = null;
  @Output() clearError = new EventEmitter<void>();

  clear() {
    this.clearError.emit();
  }

}
