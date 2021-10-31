import {Component, Input, OnInit} from '@angular/core';
import {BlackJackGame} from '../../../../../core/store/blackjack/model/black-jack-game.model';

@Component({
  selector: 'app-blackjack-pot',
  templateUrl: './black-jack-pot.component.html',
  styleUrls: ['./black-jack-pot.component.scss']
})
export class BlackJackPotComponent implements OnInit {

  @Input() game: BlackJackGame;

  constructor() {
  }

  ngOnInit() {
  }

}
