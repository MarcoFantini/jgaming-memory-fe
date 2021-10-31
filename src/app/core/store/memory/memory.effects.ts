import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import * as MemoryActions from './memory.actions';
import {MemoryGameService} from './services/memory-game.service';
import {MemoryInstanceService} from './services/memory-instance.service';
import {MemoryInstanceJSON} from './model/memory-instance.model';
import {MemoryGameJSON} from './model/memory-game.model';
import {AckJSON} from '../../model/ack.model';

@Injectable({providedIn: 'root'})
export class MemoryEffects {

  constructor(
    private actions$: Actions,
    private instancesService: MemoryInstanceService,
    private gameService: MemoryGameService
  ) {
  }

  getAllInstancesEffect$ = createEffect(() => this.actions$.pipe(
    ofType(MemoryActions.getAllInstances),
    switchMap(
      (action) => this.instancesService.getAll()
        .pipe(
          map((instances: MemoryInstanceJSON[]) => MemoryActions.getAllInstancesSuccess({instances})),
          catchError((err, caught) => caught)
        )
    )
  ));

  saveInstanceEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MemoryActions.saveInstance),
      switchMap(
        (action) => this.instancesService.save(action.instance)
          .pipe(
            map((ack: AckJSON) => MemoryActions.saveInstanceSuccess({ack})),
            catchError((err, caught) => caught)
          )
      )
    )
  );

  editInstanceEffect$ = createEffect(() => this.actions$.pipe(
    ofType(MemoryActions.editInstance),
    switchMap(
      (action) => this.instancesService.update(action.instance)
        .pipe(
          map((ack: AckJSON) => MemoryActions.editInstanceSuccess({ack})),
          catchError((err, caught) => caught)
        )
    )
  ));

  getGameEffect$ = createEffect(() =>
    this.actions$.pipe(ofType(MemoryActions.getGame),
      switchMap(
        (action) => this.gameService.get(action.id)
          .pipe(
            map((game: MemoryGameJSON) => MemoryActions.getGameSuccess({game})),
            catchError((err, caught) => caught)
          )
      )
    )
  );

  deleteInstanceEffect$ = createEffect(() => this.actions$.pipe(
    ofType(MemoryActions.deleteInstance),
    switchMap(
      (action) => this.instancesService.delete(action.id)
        .pipe(
          map((instance: MemoryInstanceJSON) => MemoryActions.deleteInstanceSuccess({instance})),
          catchError((err, caught) => caught)
        )
    )
  ));


}
