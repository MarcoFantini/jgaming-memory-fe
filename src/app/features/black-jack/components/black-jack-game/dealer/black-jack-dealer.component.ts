import {Component, Input} from '@angular/core';
import {BlackJackDealer} from '../../../../../core/store/blackjack/model/black-jack-dealer.model';

@Component({
  selector: 'app-blackjack-dealer',
  templateUrl: './black-jack-dealer.component.html',
  styleUrls: ['./black-jack-dealer.component.scss']
})
export class BlackJackDealerComponent {

  @Input() dealer: BlackJackDealer;

  computeMinWidth() {
    return this.dealer.cards.length === 0 ? '101px' : ((50 * this.dealer.cards.length) + 51).toString() + 'px';
  }
}
