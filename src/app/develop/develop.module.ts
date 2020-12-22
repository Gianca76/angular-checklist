import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevelopComponent } from './develop.component';
import { RouterModule } from '@angular/router';
import { DEVELOP_ROUTES } from './develop.routes';
import { ProjectDialogComponent } from '../projects/project-dialog/project-dialog.component';
import { TimingComponent } from './components/timing/timing.component';

@NgModule({
  declarations: [DevelopComponent, TimingComponent],
  imports: [RouterModule.forChild(DEVELOP_ROUTES), CommonModule],
  exports: [DevelopComponent, TimingComponent],
  entryComponents: [DevelopComponent]
})
export class DevelopModule {}
