import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {GameType} from '../../../core/enums/game-type.enum';
import * as BlackJackAction from '../../../core/store/blackjack/black-jack.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../../../app-state';
import * as CoreActions from '../../../core/store/core/core.actions';

@Component({
  selector: 'app-black-jack',
  templateUrl: './black-jack.component.html',
  styleUrls: ['./black-jack.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlackJackComponent implements OnInit {

  gameType = GameType.BLACKJACK;
  isConnected: boolean;

  constructor(
      private store: Store<AppState>
  ) {
    this.isConnected = false;
  }

  ngOnInit() {
    this.store.dispatch(CoreActions.changeGame({ gameType: this.gameType }));
  }

  onClickConnect() {
    this.store.dispatch(BlackJackAction.connect());
    this.isConnected = true;
  }
}
