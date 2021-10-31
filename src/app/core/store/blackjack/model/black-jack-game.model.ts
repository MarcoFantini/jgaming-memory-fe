import {ActiveModel, Validator} from '../../../model/active.model';
import {BlackJackGamer} from './black-jack-gamer.model';
import {BlackJackDealer} from './black-jack-dealer.model';
import {BlackJackRound} from './black-jack-round.model';
import {BlackJackGamePhase} from './black-jack-game-phase';

export interface BlackJackGameJSON {
  dealer: BlackJackDealer;
  gamers: Array<BlackJackGamer>;
  gamePhase: BlackJackGamePhase;
  round: BlackJackRound;
  inPlay: number;
}

const validator = new Validator(
  'Game',
  ['gamePhase', 'dealer', 'gamers', 'round', 'inPlay'],
  ['gamePhase', 'dealer', 'gamers', 'round', 'inPlay']
);

export class BlackJackGame extends ActiveModel {

  dealer: BlackJackDealer;
  gamers: Array<BlackJackGamer>;
  gamePhase: BlackJackGamePhase;
  round: BlackJackRound;
  inPlay: number;

  constructor(response: BlackJackGameJSON) {
    super(response, validator);
  }

  static toJSON(game: BlackJackGame) {
    return game as BlackJackGameJSON;
  }

}
