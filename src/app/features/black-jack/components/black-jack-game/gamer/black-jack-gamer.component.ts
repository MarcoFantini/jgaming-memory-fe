import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {BlackJackGamer} from '../../../../../core/store/blackjack/model/black-jack-gamer.model';
import {BlackJackBalanceAnimComponent} from './balance-anim/black-jack-balance-anim.component';
import {BlackJackGame} from '../../../../../core/store/blackjack/model/black-jack-game.model';
import {BlackJackGamerActionModel} from '../../../../../core/store/blackjack/model/black-jack-gamer-action.model';
import {BlackJackGamerActionEnum} from '../../../../../core/store/blackjack/model/black-jack-gamer-action-enum';
import {BlackJackGamePhase} from '../../../../../core/store/blackjack/model/black-jack-game-phase';

@Component({
  selector: 'app-blackjack-gamer',
  templateUrl: './black-jack-gamer.component.html',
  styleUrls: ['./black-jack-gamer.component.scss']
})
export class BlackJackGamerComponent implements OnInit {
  @ViewChild('balanceAnim', {static: false}) balanceAnim: BlackJackBalanceAnimComponent;

  @Output() gamerAction = new EventEmitter<BlackJackGamerActionModel>();

  @Input() game: BlackJackGame;
  @Input() gamer: BlackJackGamer;
  @Input() chair: number;
  @Input() selected: number;
  @Input() waiting: boolean;

  gamePhaseEnum = BlackJackGamePhase;

  ngOnInit() {
    if (this.isGamerTurn() && this.computeGamerPoints() >= 21) {
      this.onClickCheck();
    }
  }

  onClickCallCard() {
    this.gamerAction.emit(new BlackJackGamerActionModel(BlackJackGamerActionEnum.CALL_CARD, this.chair));
  }

  onSubmitBet(value: number) {
    this.gamerAction.emit(new BlackJackGamerActionModel(BlackJackGamerActionEnum.SET_BET, this.chair, value));
  }

  onClickCheck() {
    this.gamerAction.emit(new BlackJackGamerActionModel(BlackJackGamerActionEnum.CHECK, this.chair));
  }

  onClickLeaveGame() {
    this.gamerAction.emit(new BlackJackGamerActionModel(BlackJackGamerActionEnum.LEAVE_GAME, this.chair));
  }

  playBalanceAnim(money: number) {
    this.balanceAnim.setMoney(money);
    this.balanceAnim.play();
  }

  getGamePhase() {
    return this.game.gamePhase;
  }

  isGamerTurn() {
    return this.game.inPlay === this.chair && (this.game.inPlay === 5 || this.isSelected());
  }

  isSelected() {
    return this.selected === this.chair;
  }

  computeGamerPoints() {
    let points = 0;
    const aces = this.gamer.cards.filter(card => card.value === 1);
    this.gamer.cards.forEach(card => (card.value !== 1 && card.value) >= 11 ? points += 10 : points += card.value);
    aces.forEach(ace => {
      if (points + 11 <= 21) {
        points += 11;
      } else {
        points += ace.value;
      }
    });
    return points;
  }
}
