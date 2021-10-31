import {BlackJackCard} from './black-jack-card.model';
import {Validator} from '../../../model/active.model';

export interface BlackJackGamerJSON {
  username: string;
  chair: number;
  balance: number;
  cards: Array<BlackJackCard>;
}

const validator = new Validator(
  'Gamer',
  ['username', 'chair', 'balance', 'cards'],
  ['username', 'chair', 'balance', 'cards'],
);

export class BlackJackGamer {

  username: string;
  chair: number;
  balance: number;
  cards: Array<BlackJackCard>;

  constructor() {
    this.cards = new Array<BlackJackCard>();
  }

 /* constructor(response: GamerJSON) {
    super(response, validator);
  }*/

  static toJSON(gamer: BlackJackGamer) {
    return gamer as BlackJackGamerJSON;
  }

}
