import {Validator} from '../../../model/active.model';
import {BlackJackSuitEnum} from './black-jack-suit-enum';

export interface BlackJackCardJSON {
  value: number;
  suit: BlackJackSuitEnum;
}

const validator = new Validator(
  'Card',
  ['value', 'suit'],
  ['value', 'suit']
);

export class BlackJackCard {
  value: number;
  suit: BlackJackSuitEnum;

  /*constructor(response: CardJSON) {
    super(response, validator);
  }*/

  static toJSON(card: BlackJackCard) {
    return card as BlackJackCardJSON;
  }

}
