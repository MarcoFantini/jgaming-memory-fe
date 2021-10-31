import {createReducer, on} from '@ngrx/store';
import {User} from './model/user.model';
import * as UserActions from '../user/user.actions';

export interface UserState {
  user: User;
}

export const initialState: UserState = {
  user: new User(null)
};

const reducer = createReducer(
  initialState,
  on(UserActions.loginSuccess, (state, action) => {
    return {
      ...state,
      user: new User(action.user)
    };
  }),
  on(UserActions.logoutSuccess, (state, action) => {
    return {
      ...state,
      user: new User(null)
    };
  }),
);

export function userReducer(state: UserState | undefined, action) {
  return reducer(state, action);
}
