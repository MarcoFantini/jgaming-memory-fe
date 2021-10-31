import {Component, Input, OnInit} from '@angular/core';
import {BlackJackCard} from '../../../../../core/store/blackjack/model/black-jack-card.model';
import {BlackJackSuitEnum} from '../../../../../core/store/blackjack/model/black-jack-suit-enum';

@Component({
  selector: 'app-blackjack-card',
  templateUrl: './black-jack-card.component.html',
  styleUrls: ['./black-jack-card.component.scss']
})
export class BlackJackCardComponent implements OnInit {

  @Input() card: BlackJackCard;

  img: string;

  ngOnInit() {
    switch (this.card.suit) {
      case BlackJackSuitEnum.CLUBS: {
        this.img = this.card.value + 'C.png';
        break;
      }
      case BlackJackSuitEnum.DIAMONDS: {
        this.img = this.card.value + 'D.png';
        break;
      }
      case BlackJackSuitEnum.HEARTS: {
        this.img = this.card.value + 'H.png';
        break;
      }
      case BlackJackSuitEnum.SPADES: {
        this.img = this.card.value + 'S.png';
        break;
      }
    }
  }

}
