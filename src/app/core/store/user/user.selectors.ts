import {createSelector} from '@ngrx/store';
import {UserState} from './user.reducer';
import {User} from './model/user.model';
import {AppState} from '../../../app-state';
import {environment} from '../../../../environments/environment';

const root = (state: AppState): UserState => state.user;

export const getUser = createSelector(
    root,
    (state: UserState): User => state.user
);

export const isLogged = createSelector(
    getUser,
    (user: User) => environment.skipLogin ? true : !!user.token
);
