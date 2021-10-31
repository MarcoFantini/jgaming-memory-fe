import {createReducer, on} from '@ngrx/store';
import * as MinefieldActions from './minefield.actions';
import {MinefieldGame} from './model/minefield-game.model';
import {MinefieldInstance} from './model/minefield-instance.model';
import {Ack} from '../../model/ack.model';

export interface MinefieldState {
  instances: MinefieldInstance[];
  game: MinefieldGame;
  ack: Ack;
}

export const initialState: MinefieldState = {
  instances: [],
  game: null,
  ack: null,
};

const reducer = createReducer(
  initialState,
  on(MinefieldActions.getAllInstancesSuccess, (state, action) => {
    return {
      ...state,
      instances: [...action.instances.map(value => new MinefieldInstance(value))]
    };
  }),
  on(MinefieldActions.saveInstanceSuccess, (state, action) => {
    return {
      ...state,
      ack: new Ack(action.ack)
    };
  }),
  on(MinefieldActions.getGameSuccess, (state, action) => {
    return {
      ...state,
      game: new MinefieldGame(action.game)
    };
  }),
  on(MinefieldActions.deleteInstanceSuccess, (state, action) => {
    return {
      ...state,
      instances: [...state.instances.filter(value => value.id !== action.instance.id)]
    };
  }),
  on(MinefieldActions.editInstanceSuccess, (state, action) => {
    return {
      ...state,
      instances: [...state.instances.map(value => value.id === action.instance.id ? action.instance : value)]
    };
  }),
  on(MinefieldActions.clean, (state, action) => {
    return {
      ...state,
      instances: [],
      game: null
    };
  }),
);

export function minefieldReducer(state: MinefieldState | undefined, action) {
  return reducer(state, action);
}
