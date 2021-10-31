import {BlackJackGamerActionEnum} from './black-jack-gamer-action-enum';

export class BlackJackGamerActionModel {

  action: BlackJackGamerActionEnum;
  chair: number;
  value: number;

  constructor(action: BlackJackGamerActionEnum, chair: number, value?: number) {
    this.action = action;
    this.chair = chair;
    if (value) {
      this.value = value;
    }
  }
}
