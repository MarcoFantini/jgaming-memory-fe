import {createSelector} from '@ngrx/store';
import {AppState} from '../../../app-state';
import {MinefieldState} from './minefield.reducer';
import {MinefieldInstance} from './model/minefield-instance.model';
import {MinefieldGame} from './model/minefield-game.model';
import {Ack} from '../../model/ack.model';

const root = (state: AppState): MinefieldState => state.minefield;

export const getInstances = createSelector(
  root,
  (state: MinefieldState): MinefieldInstance[] => state.instances
);

export const getGame = createSelector(
  root,
  (state: MinefieldState): MinefieldGame => state.game
);

export const check = createSelector(
  root,
  (state: MinefieldState): Ack => state.ack
);
