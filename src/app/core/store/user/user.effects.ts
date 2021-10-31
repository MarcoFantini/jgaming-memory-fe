import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType, ROOT_EFFECTS_INIT} from '@ngrx/effects';
import {UserService} from './services/user.service';
import * as UserActions from '../user/user.actions';
import {catchError, filter, map, mapTo, switchMap, tap} from 'rxjs/operators';
import {User, UserJSON} from './model/user.model';
import {Ack} from '../../model/ack.model';

@Injectable({providedIn: 'root'})
export class UserEffects {

    constructor(
        private actions$: Actions,
        private userService: UserService
    ) {
    }

    initEffect$ = createEffect(() => this.actions$.pipe(
        ofType(ROOT_EFFECTS_INIT),
        // get token
        mapTo(this.userService.getUser()),
        // we want dispatch an action only when an accessToken is found in localStorage
        filter((user: User) => !!user && !!user.token),
        // save token in localStorage
        map((user: User) => UserActions.loginSuccess({user}))
    ));

    saveEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.saveUser),
            switchMap(
                (action) => this.userService.save(action.user)
                    .pipe(
                        map((user: UserJSON) => UserActions.saveUserSuccess({user})),
                        catchError((err, caught) => caught)
                    )
            )
        )
    );

    loginEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.login),
            switchMap(
                (action) => this.userService.login(action.login)
                    .pipe(
                        map((user: UserJSON) => UserActions.loginSuccess({user})),
                        catchError((err, caught) => caught)
                    )
            )
        )
    );


    loginSuccessEffects$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loginSuccess),
            tap(action => this.userService.storeUser(action.user))), {dispatch: false});


    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.logout),
            switchMap(
                action => this.userService.logout()
                    .pipe(
                        map((result: Ack) => UserActions.logoutSuccess()),
                        catchError((err, caught) => caught)
                    )
            )
        )
    );

    logoutSuccessEffects$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.logoutSuccess),
            tap(action => this.userService.unstoreUser())), {dispatch: false});

}
