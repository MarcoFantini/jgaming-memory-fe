import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {BlackJackService} from './services/black-jack.service';
import * as BlackJackActions from '../blackjack/black-jack.actions';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {BlackJackGame} from './model/black-jack-game.model';
import {BlackJackEvent} from './model/black-jack-event.model';

@Injectable({providedIn: 'root'})
export class BlackJackEffects {

  constructor(
    private actions$: Actions,
    private blackjackService: BlackJackService
  ) {
  }

  connect$ = createEffect(() => this.actions$.pipe(
    ofType(BlackJackActions.connect),
    switchMap(
      (action) => this.blackjackService.connect()
        .pipe(
          map((game: BlackJackGame) => BlackJackActions.connectSuccess({game})),
          catchError((err, caught) => caught)
        )
    )
  ));

  subsToEvents$ = createEffect(() => this.actions$.pipe(
    ofType(BlackJackActions.subsToEvents),
    switchMap(
      () => this.blackjackService.subsToEvents()
        .pipe(
          map((event: BlackJackEvent) => BlackJackActions.subsToEventsSuccess({event})),
          catchError((err, caught) => caught)
        )
    )
  ));

  sitAndPlay$ = createEffect(() => this.actions$.pipe(
    ofType(BlackJackActions.sitAndPlay),
    tap(action => this.blackjackService.sitAndPlay(action.username, action.chair))
    ), {dispatch: false}
  );

  setBet$ = createEffect(() => this.actions$.pipe(
    ofType(BlackJackActions.setBet),
    tap(action => this.blackjackService.setBet(action.chair, action.value))
  ), {dispatch: false});

  callCard$ = createEffect(() => this.actions$.pipe(
    ofType(BlackJackActions.callCard),
    tap(action => this.blackjackService.callCard(action.chair))
  ), {dispatch: false});

  check$ = createEffect(() => this.actions$.pipe(
    ofType(BlackJackActions.check),
    tap(action => this.blackjackService.check(action.chair))
  ), {dispatch: false});

  leaveGame$ = createEffect(() => this.actions$.pipe(
    ofType(BlackJackActions.leaveGame),
    tap(action => this.blackjackService.leaveGame(action.chair))
  ), {dispatch: false});

  resetGame$ = createEffect(() => this.actions$.pipe(
    ofType(BlackJackActions.resetGame),
    tap(action => this.blackjackService.resetGame())
  ), {dispatch: false});

}
