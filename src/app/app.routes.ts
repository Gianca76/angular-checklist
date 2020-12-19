import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/projects', pathMatch: 'full' },
  { path: 'develop', redirectTo: '/develop', pathMatch: 'full' },
  { path: '**', redirectTo: '/projects' }
];
