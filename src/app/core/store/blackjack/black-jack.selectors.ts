import {createSelector} from '@ngrx/store';
import {BlackJackState} from './black-jack.reducer';
import {AppState} from '../../../app-state';
import {BlackJackGame} from './model/black-jack-game.model';
import {BlackJackEvent} from './model/black-jack-event.model';

const root = (state: AppState): BlackJackState => state.blackjack;

export const getGame = createSelector(
  root,
  (state: BlackJackState): BlackJackGame => state.game
);

export const getEvent = createSelector(
  root,
  (state: BlackJackState): BlackJackEvent => state.event
);
