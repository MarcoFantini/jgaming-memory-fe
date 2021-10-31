import {createAction, props} from '@ngrx/store';
import {User, UserJSON} from './model/user.model';
import {Login} from './model/login.model';

export const saveUser = createAction(
  '[User] Save User',
  props<{ user: User }>()
);

export const saveUserSuccess = createAction(
  '[User] Save User Success',
  props<{ user: UserJSON }>()
);

export const login = createAction(
  '[User] Login User',
  props<{ login: Login }>()
);

export const loginSuccess = createAction(
  '[User] Login User Success',
  props<{ user: UserJSON }>()
);

export const logout = createAction(
  '[User] Logout User',
);

export const logoutSuccess = createAction(
  '[User] Logout User Success',
);

