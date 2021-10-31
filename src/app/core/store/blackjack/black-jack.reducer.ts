import {createReducer, on} from '@ngrx/store';
import {BlackJackGame} from './model/black-jack-game.model';
import * as BlackJackAction from './black-jack.actions';
import {BlackJackEvent} from './model/black-jack-event.model';

export interface BlackJackState {
  game: BlackJackGame;
  event: BlackJackEvent;
}

export const initialState: BlackJackState = {
  game: new BlackJackGame(null),
  event: new BlackJackEvent(null)
};

const reducer = createReducer(
  initialState,
  on(BlackJackAction.connectSuccess, (state, action) => {
    return {
      ...state,
      game: new BlackJackGame(action.game)
    };
  }),
  on(BlackJackAction.subsToEventsSuccess, (state, action) => {
    return {
      ...state,
      event: new BlackJackEvent(action.event)
    };
  }),
  on(BlackJackAction.setPlayedGamer, (state, action) => {
    return {
      ...state,
      game: updateInPlay(state, action)
    };
  }),
  on(BlackJackAction.setGamerBalance, (state, action) => {
    return {
      ...state,
      game: updateGamerBalance(state, action)
    };
  }),
  on(BlackJackAction.addCardToPlayer, (state, action) => {
    return {
      ...state,
      game: updateGamerHand(state, action)
    };
  }),
);

const updateInPlay = (state, action) => {
  const updatedGame = {...state.game};
  updatedGame.inPlay = action.chair;
  return updatedGame;
};

const updateGamerBalance = (state, action) => {
  const updatedGamer = {...state.game.gamers[action.chair]};
  updatedGamer.balance -= action.amount;
  const updatedGamers = [...state.game.gamers];
  updatedGamers[action.chair] = updatedGamer;
  const updatedGame = {...state.game};
  updatedGame.gamers = updatedGamers;
  return updatedGame;
};

const updateGamerHand = (state, action) => {
  const updatedGame = {...state.game};
  if (action.chair === -1) {
    const updatedDealerCards = [...state.game.dealer.cards];
    updatedDealerCards.push(action.card);
    const updatedDealer = {...state.game.dealer};
    updatedDealer.cards = updatedDealerCards;
    updatedGame.dealer = updatedDealer;
  } else {
    const updatedGamerCards = [...state.game.gamers[action.chair].cards];
    updatedGamerCards.push(action.card);
    const updatedGamer = {...state.game.gamers[action.chair]};
    updatedGamer.cards = updatedGamerCards;
    const updatedGamers = [...state.game.gamers];
    updatedGamers[action.chair] = updatedGamer;
    updatedGame.gamers = updatedGamers;
  }
  return updatedGame;
};

export function blackJackReducer(state: BlackJackState | undefined, action) {
  return reducer(state, action);
}
