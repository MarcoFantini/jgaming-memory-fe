import {Component, OnDestroy, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss']
})
export class ModalConfirmComponent implements OnInit, OnDestroy {
  public onClose: Subject<boolean>;

  public message: string;
  public modalHeaderClass: string;

  constructor(
    public bsModalRef: BsModalRef
  ) {
  }

  public ngOnInit(): void {
    this.onClose = new Subject();
    console.log(this.modalHeaderClass);
  }

  public ngOnDestroy(): void {
    this.onClose.unsubscribe();
  }

  public confirmHandler(): void {
    this.onClose.next();
    this.bsModalRef.hide();
  }
}
