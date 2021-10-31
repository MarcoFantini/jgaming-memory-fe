import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-blackjack-countdown',
  templateUrl: './black-jack-countdown.component.html',
  styleUrls: ['./black-jack-countdown.component.scss']
})
export class BlackJackCountdownComponent {

  @Input() time: number;

}
