import {createAction, props} from '@ngrx/store';
import {BlackJackGame} from './model/black-jack-game.model';
import {BlackJackEvent} from './model/black-jack-event.model';
import {BlackJackCard} from './model/black-jack-card.model';

export const connect = createAction(
  '[BlackJack] Connect to BlackJack game'
);

export const connectSuccess = createAction(
  '[BlackJack] Successful connection to BlackJack game',
  props<{ game: BlackJackGame }>()
);

export const subsToEvents = createAction(
  '[BlackJack] Subscribe to BlackJack game events'
);

export const subsToEventsSuccess = createAction(
  '[BlackJack] Successful connection subscribe to BlackJack game events',
  props<{ event: BlackJackEvent }>()
);

export const sitAndPlay = createAction(
  '[BlackJack] sitAndPlay gamer action',
  props<{ username: string, chair: number }>()
);

export const setBet = createAction(
  '[BlackJack] setBet gamer action',
  props<{ chair: number, value: number }>()
);

export const callCard = createAction(
  '[BlackJack] callCard gamer action',
  props<{ chair: number }>()
);

export const check = createAction(
  '[BlackJack] check gamer action',
  props<{ chair: number }>()
);

export const leaveGame = createAction(
  '[BlackJack] leaveGame gamer action',
  props<{ chair: number }>()
);

export const resetGame = createAction(
  '[BlackJack] resetGame gamer action'
);

export const setPlayedGamer = createAction(
  '[BlackJack] Set player gamer',
  props<{ chair: number }>()
);

export const setGamerBalance = createAction(
  '[BlackJack] Set gamer balance',
  props<{ chair: number, amount: number }>()
);

export const addCardToPlayer = createAction(
  '[BlackJack] Add card to gamer\'s hand',
  props<{ chair: number, card: BlackJackCard }>()
);

