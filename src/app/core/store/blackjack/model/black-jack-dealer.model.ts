import {BlackJackCard} from './black-jack-card.model';
import {ActiveModel, Validator} from '../../../model/active.model';

export interface BlackJackDealerJSON {
  cards: Array<BlackJackCard>;
}

const validator = new Validator(
  'Dealer',
  ['cards'],
  ['cards']
);

export class BlackJackDealer extends ActiveModel {

  cards: Array<BlackJackCard>;

  constructor(response: BlackJackDealerJSON) {
    super(response, validator);
    this.cards = new Array<BlackJackCard>();
  }

  static toJSON(card: BlackJackDealerJSON) {
    return card as BlackJackDealerJSON;
  }

}
