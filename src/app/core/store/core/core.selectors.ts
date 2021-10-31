import {createSelector} from '@ngrx/store';
import {AppState} from '../../../app-state';
import {CoreState} from './core.reducer';
import {GameType} from '../../enums/game-type.enum';

const root = (state: AppState): CoreState => state.core;

export const getGameType = createSelector(
  root,
  (state: CoreState): GameType => state.gameType
);
