import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {GameType} from '../../../enums/game-type.enum';

@Component({
  selector: 'app-footer-game',
  templateUrl: './footer-game.component.html',
  styleUrls: ['./footer-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterGameComponent implements OnInit {

  @Input() gameType: GameType;

  prefix: string;
  gameFooterClass: string;

  constructor(
  ) {}

  ngOnInit() {
    this.prefix = this.gameType.toLowerCase();
    this.gameFooterClass = 'footer-' + this.gameType.toLowerCase();
  }

}
