import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevelopComponent } from './develop.component';
import { RouterModule } from '@angular/router';
import { DEVELOP_ROUTES } from './develop.routes';
import { ProjectDialogComponent } from '../projects/project-dialog/project-dialog.component';

@NgModule({
  declarations: [DevelopComponent],
  imports: [RouterModule.forChild(DEVELOP_ROUTES), CommonModule],
  exports: [DevelopComponent],
  entryComponents: [DevelopComponent]
})
export class DevelopModule {}
