import { Component, input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
  <footer class="py-8 text-white bg-gray-800">
    <div class="container px-4 mx-auto">
      <div class="flex flex-col justify-between items-center md:flex-row">
        <div class="mb-4 md:mb-0">
          <h3 class="text-2xl font-bold">TrimUrl</h3>
          <p class="text-gray-400">Simplify your links, amplify your reach.</p>
        </div>
        <div class="flex space-x-4">
          <a href="#" class="transition duration-300 hover:text-indigo-400">Terms</a>
          <a href="#" class="transition duration-300 hover:text-indigo-400">Privacy</a>
          <a href="#" class="transition duration-300 hover:text-indigo-400">Contact</a>
        </div>
      </div>
    </div>
    <div class="pt-8 mt-8 text-center text-gray-400 border-t border-gray-700">
      <p>&copy; {{ currentYear() }} TrimUrl. All rights reserved.</p>
    </div>
  </footer>
`
})
export class FooterComponent {
  currentYear = input.required<number>();
}