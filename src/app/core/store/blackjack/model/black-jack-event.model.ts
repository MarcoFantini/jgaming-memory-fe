import {BlackJackCard} from './black-jack-card.model';
import {ActiveModel, Validator} from '../../../model/active.model';
import {BlackJackEventType} from './black-jack-event-type.enum';

export interface BlackJackEventJSON {
  eventType: BlackJackEventType;
  chair: number;
  amount: number;
  card: BlackJackCard;
}

const validator = new Validator(
  'Event',
  ['eventType', 'chair', 'amount', 'card'],
  ['eventType', 'chair', 'amount', 'card'],
);

export class BlackJackEvent extends ActiveModel {

  eventType: BlackJackEventType;
  chair: number;
  amount: number;
  card: BlackJackCard;

  constructor(response: BlackJackEventJSON) {
    super(response, validator);
  }

  static toJSON(event: BlackJackEvent) {
    return event as BlackJackEventJSON;
  }

}
