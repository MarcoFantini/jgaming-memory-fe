import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import * as MinefieldActions from './minefield.actions';
import {Injectable} from '@angular/core';
import {MinefieldInstanceService} from './services/minefield-instance.service';
import {MinefieldGameService} from './services/minefield-game.service';
import {MinefieldInstanceJSON} from './model/minefield-instance.model';
import {MinefieldGameJSON} from './model/minefield-game.model';
import {logging} from 'protractor';
import {AckJSON} from '../../model/ack.model';


@Injectable({providedIn: 'root'})
export class MinefieldEffects {

  constructor(
    private actions$: Actions,
    private instanceService: MinefieldInstanceService,
    private gameService: MinefieldGameService
  ) {
  }

  getAllInstancesEffect$ = createEffect(() => this.actions$.pipe(
    ofType(MinefieldActions.getAllInstances),
    switchMap(
      (action) => this.instanceService.getAll()
        .pipe(
          map((instances: MinefieldInstanceJSON[]) => MinefieldActions.getAllInstancesSuccess({instances})),
          catchError((err, caught) => caught)
        )
    )
  ));

  saveInstanceEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MinefieldActions.saveInstance),
      switchMap(
        (action) => this.instanceService.save(action.instance)
          .pipe(
            map((ack: AckJSON) => MinefieldActions.saveInstanceSuccess({ack})),
            catchError((err, caught) => caught)
          )
      )
    )
  );

  getGameEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MinefieldActions.getGame),
      switchMap(
        (action) => this.gameService.get(action.id)
          .pipe(
            map((game: MinefieldGameJSON) => MinefieldActions.getGameSuccess({game})),
            catchError((err, caught) => caught)
          )
      )
    )
  );

  deleteInstanceEffect$ = createEffect(() => this.actions$.pipe(
    ofType(MinefieldActions.deleteInstance),
    switchMap(
      (action) => this.instanceService.delete(action.id)
        .pipe(
          map((instance: MinefieldInstanceJSON) => MinefieldActions.deleteInstanceSuccess({instance})),
          catchError((err, caught) => caught)
        )
    )
  ));

  editTestEffect$ = createEffect(() => this.actions$.pipe(
    ofType(MinefieldActions.editInstance),
    switchMap(
      (action) => this.instanceService.update(action.instance)
        .pipe(
          map((instance: MinefieldInstanceJSON) => MinefieldActions.editInstanceSuccess({instance})),
          catchError((err, caught) => caught)
        )
    )
  ));

}
