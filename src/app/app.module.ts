import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { ChecklistModule } from './checklist/checklist.module';
import { CustomMaterialModule } from './custom-material.module';
import { ProjectsModule } from './projects/projects.module';
import { META_REDUCERS, ROOT_REDUCER } from './state/app.state';
import { DevelopModule } from './develop/develop.module';
import { EffectsModule } from '@ngrx/effects';
import { ProjectStateEffects } from './projects/state/project-state.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'angular-checklist' }),
    BrowserAnimationsModule,
    EffectsModule.forRoot([ProjectStateEffects]),
    StoreModule.forRoot(ROOT_REDUCER, { metaReducers: META_REDUCERS }),
    ProjectsModule,
    ChecklistModule,
    DevelopModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    RouterModule.forRoot(APP_ROUTES, {
      preloadingStrategy: PreloadAllModules
    }),
    StoreRouterConnectingModule.forRoot(),
    CustomMaterialModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
