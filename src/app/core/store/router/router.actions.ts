import {createAction, props} from '@ngrx/store';

export const go = createAction(
  '[Router] Go',
  props<{ path: string }>()
);

export const goToHome = createAction(
    '[Router] Go To Home'
);

export const back = createAction(
  '[Router] Back'
);

export const forward = createAction(
  '[Router] Forward'
);
