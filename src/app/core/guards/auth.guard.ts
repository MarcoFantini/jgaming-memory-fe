import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate} from '@angular/router';
import * as UserSelectors from '../../core/store/user/user.selectors';
import {select, Store} from '@ngrx/store';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import * as RouterActions from '../../core/store/router/router.actions';
import {AppState} from '../../app-state';
import {User} from '../store/user/model/user.model';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        private store: Store<AppState>
    ) { }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this.store.pipe(
            select(UserSelectors.getUser),
            map((user: User) => {
                const roles = route.data.roles;
                if (!!user.token) {
                    if (!roles || !roles.length) {
                        return true;
                    } else {
                        return roles.includes(user.role);
                    }
                } else {
                    return false;
                }
            }),
            tap(isLogged => {
                if (!isLogged) {
                    this.store.dispatch(RouterActions.goToHome());
                }
            })
        );
    }
}
