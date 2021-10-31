import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {GameType} from '../../../enums/game-type.enum';
import {ModalRulesComponent} from '../../modals/modal-rules/modal-rules.component';

@Component({
  selector: 'app-menu-game',
  templateUrl: './menu-game.component.html',
  styleUrls: ['./menu-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuGameComponent implements OnInit {

  @Input() hideHome: boolean;
  @Input() gameType: GameType;

  menuClass: string;
  buttonClass: string;

  constructor(
    public modalService: BsModalService,
  ) { }

  ngOnInit() {
    this.menuClass = 'menu-' + this.gameType.toLowerCase();
    this.buttonClass = this.gameType.toLowerCase() + '-btn';
  }

  showRules() {
    const initialState = { currentGameType: this.gameType };
    return this.modalService.show(ModalRulesComponent, {
      initialState,
      class: 'modal-lg'
    });
  }
}
