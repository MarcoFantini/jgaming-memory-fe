import {createAction, props} from '@ngrx/store';
import {MinefieldInstance, MinefieldInstanceJSON} from './model/minefield-instance.model';
import {MinefieldGameJSON} from './model/minefield-game.model';
import {AckJSON} from '../../model/ack.model';

export const getAllInstances = createAction(
  '[MinefieldInstance] Get All Instances',
);

export const getAllInstancesSuccess = createAction(
  '[MinefieldInstance] Get All Instances Success',
  props<{ instances: MinefieldInstanceJSON[] }>()
);

export const saveInstance = createAction(
  '[MinefieldInstance] Save Instance',
  props<{ instance: MinefieldInstance }>()
);

export const saveInstanceSuccess = createAction(
  '[Ack] Save Instance Success',
  props<{ ack: AckJSON }>()
);

export const deleteInstance = createAction(
  '[MinefieldInstance] Delete Instance',
  props<{ id: number }>()
);

export const deleteInstanceSuccess = createAction(
  '[MinefieldInstance] Delete Instance Success',
  props<{ instance: MinefieldInstanceJSON }>()
);

export const getGame = createAction(
  '[Minefield] Get Game',
  props<{ id: number }>()
);

export const getGameSuccess = createAction(
  '[Minefield] Get Game Success',
  props<{ game: MinefieldGameJSON }>()
);

export const editInstance = createAction(
  '[Minefield] Edit Instance',
  props<{ instance: MinefieldInstance }>()
);

export const editInstanceSuccess = createAction(
  '[Minefield] Edit Instance Success',
  props<{ instance: MinefieldInstanceJSON }>()
);

export const clean = createAction(
  '[Minefield] Clean Minefield'
);
