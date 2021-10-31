import {Component, OnDestroy, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {Subject} from 'rxjs';
import {GameType} from '../../../enums/game-type.enum';

@Component({
  selector: 'app-modal-rules',
  templateUrl: './modal-rules.component.html',
  styleUrls: ['./modal-rules.component.scss']
})
export class ModalRulesComponent implements OnInit, OnDestroy {

  public onClose: Subject<boolean>;

  currentGameType: string;
  gameTypes = GameType;

  constructor(
      public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
    this.onClose = new Subject();
  }

  ngOnDestroy(): void {
    this.onClose.unsubscribe();
  }

  get GameType() {
    return GameType;
  }
}
