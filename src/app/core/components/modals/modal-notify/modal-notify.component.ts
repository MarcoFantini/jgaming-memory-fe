import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {CallMode} from '../../../enums/call-mode.enum';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal-notify.component.html',
  styleUrls: ['./modal-notify.component.scss']
})
export class ModalNotifyComponent implements OnInit, OnDestroy {

  public onClose: Subject<boolean>;

  callModes = CallMode;

  callMode: CallMode;
  modalHeaderClass: string;
  modalButtonClass: string;

  constructor(
    public bsModalRef: BsModalRef
  ) {
  }

  public ngOnInit(): void {
    this.onClose = new Subject();
  }

  public ngOnDestroy(): void {
    this.onClose.unsubscribe();
  }

  public confirmHandler(): void {
    this.onClose.next();
    this.bsModalRef.hide();
  }

}
