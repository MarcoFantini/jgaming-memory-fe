import {Validator} from '../../../model/active.model';
import {BlackJackGamer} from './black-jack-gamer.model';

export interface BlackJackBetJSON {
  gamer: BlackJackGamer;
  value: number;
}

const validator = new Validator(
  'Bet',
  ['gamer', 'value'],
  ['gamer', 'value'],
);

export class BlackJackBet {
  gamer: BlackJackGamer;
  value: number;

  /*constructor(response: BetJSON) {
    super(response, validator);
  }*/

  static toJSON(bet: BlackJackBet) {
    return bet as BlackJackBetJSON;
  }

}
