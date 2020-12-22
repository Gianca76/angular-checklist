import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { Observable, of } from 'rxjs';
import * as ProjectActions from './projects.actions';
import { ProjectStateService } from '../services/project-state.service';
import { ToggleFavorite, ToggleFavoriteFailed, ToggleFavoriteSuccess } from './projects.actions';
import { ApplicationState } from '../../state/app.state';
import { Action, Store } from '@ngrx/store';

@Injectable()
export class ProjectStateEffects {

  // @Effect()
  // getWifiData: Observable<Action> = this.actions$.pipe(
  //   ofType(WifiTypes.getWifiNetworks),
  //   mergeMap((action: GetWifiNetworks) =>
  //     this.mapService.getWifiNetworks().pipe(
  //       map((data: WifiNetworks) => new GetWifiNetworksSucc(data)),
  //       catchError(() => of(new GetWifiNetworksErr()))
  //     )),
  // );

  @Effect()
  ToggleFavorite: Observable<any> = this.actions$.pipe(
    ofType(ProjectActions.ProjectsActionTypes.TOGGLE_FAVORITE),
    mergeMap((action) => this.projectService.toggleFavorite(action)
      .pipe(
        map(item => this.store.dispatch(new ToggleFavoriteSuccess(item))),
        catchError(() => of(new ToggleFavoriteFailed())
      ))
  ));

  // toggleFavorite$ = createEffect(() => this.actions$.pipe(
  //   ofType(ProjectActions.ToggleFavorite),
  //   mergeMap((action) => this.projectService.toggleFavorite(action)
  //     .pipe(
  //       map(item => this.store.dispatch(new ToggleFavoriteSuccess(item))),
  //       catchError(() => of(new ToggleFavoriteFailed))
  //     ))
  //   )
  // );



  constructor(
    private actions$: Actions,
    private store: Store<ApplicationState>,
    private projectService: ProjectStateService
  ) {
    this.actions$.subscribe(res => console.log('action: ', res));
  }
}
