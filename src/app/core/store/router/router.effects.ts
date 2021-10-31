import {Injectable} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {tap} from 'rxjs/operators';
import * as RouterActions from './router.actions';

@Injectable({ providedIn: 'root' })
export class RouterEffects {

    constructor(
        private actions$: Actions,
        private router: Router,
        private location: Location
    ) { }

    goEffect$ = createEffect(() => this.actions$.pipe(
        ofType(RouterActions.go),
        tap(action => {
            this.router.navigateByUrl(action.path);
        })
        ), {dispatch: false}
    );

    goToHomeEffect$ = createEffect(() => this.actions$.pipe(
        ofType(RouterActions.goToHome),
        tap(action => {
            this.router.navigateByUrl('/home');
        })
        ), {dispatch: false}
    );

    backEffect$ = createEffect(() => this.actions$.pipe(
        ofType(RouterActions.back),
        tap(action => this.location.back()),
        ), {dispatch: false}
    );

    forwardEffect$ = createEffect(() => this.actions$.pipe(
        ofType(RouterActions.forward),
        tap(action => this.location.forward()),
        ), {dispatch: false}
    );
}
