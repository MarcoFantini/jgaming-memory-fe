import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import * as RankActions from './rank.actions';
import {Injectable} from '@angular/core';
import {RankService} from './services/rank.service';
import {RankJSON} from './model/rank.model';
import {RankUpdateJSON} from './model/rank-update.model';

@Injectable({providedIn: 'root'})
export class RankEffects {

  constructor(
    private actions$: Actions,
    private rankService: RankService
  ) {
  }

  getAllRankEffect$ = createEffect(() => this.actions$.pipe(
    ofType(RankActions.getAllRanks),
    switchMap(
      (action) => this.rankService.getAll(action.gameType)
        .pipe(
          map((ranks: RankJSON[]) => RankActions.getAllRanksSuccess({ranks})),
          catchError((err, caught) => caught)
        )
    )
  ));

  /*saveRankUpdateEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RankActions.saveRankUpdate),
      tap(action => this.rankService.save(action.rankUpdate))
    ), {dispatch: false}
  );*/

  saveRankEffect$ = createEffect(() => this.actions$.pipe(
    ofType(RankActions.saveRank),
    switchMap(
      (action) => this.rankService.save(action.rankUpdate)
        .pipe(
          map((rankUpdate: RankUpdateJSON) => RankActions.saveRankSuccess({rankUpdate})),
          catchError((err, caught) => caught)
        )
    )
  ));

}
