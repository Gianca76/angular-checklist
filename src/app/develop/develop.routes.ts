import { Routes } from '@angular/router';
import { DevelopComponent } from './develop.component';
import { TimingComponent } from './components/timing/timing.component';

export const DEVELOP_ROUTES: Routes = [
  { path: 'develop', component: DevelopComponent },
  { path: 'timing', component: TimingComponent }
];
