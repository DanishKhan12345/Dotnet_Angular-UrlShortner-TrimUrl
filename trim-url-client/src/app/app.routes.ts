// import { Routes } from '@angular/router';
// import { DashboardComponent } from './components/dashboard/dashboard.component';

// export const routes: Routes = [
//   { path: '', component: DashboardComponent },
//   { path: '**', redirectTo: '' }
// ];
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/landing/landing.component').then(m => m.LandingComponent),
    title: 'TrimUrl - Shorten Your URLs'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    title: 'TrimUrl - Dashboard'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];