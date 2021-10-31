import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {CallMode} from '../../../enums/call-mode.enum';
import {BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-memory-modal',
  templateUrl: './memory-modal.component.html',
  styleUrls: ['./memory-modal.component.scss']
})
export class MemoryModalComponent implements OnInit, OnDestroy {

  public onClose: Subject<boolean>;

  callModes = CallMode;

  callMode: CallMode;
  modalHeaderClass: string;

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
