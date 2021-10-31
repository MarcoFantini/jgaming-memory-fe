import {Injectable} from '@angular/core';
import {CallMode} from '../enums/call-mode.enum';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ModalMessageService {

  constructor(
    private modalService: BsModalService,
    private translateService: TranslateService
  ) { }

  public openModal(template: any, callMode: CallMode, gameType: string): BsModalRef {
    const modalButtonClass = this.translateService.instant(gameType.toLowerCase()) + '-btn';
    const modalHeaderClass = this.translateService.instant(gameType.toLowerCase());
    const initialState = {callMode, modalHeaderClass, modalButtonClass};
    return this.modalService.show(template, {
      initialState
    });
  }
}
