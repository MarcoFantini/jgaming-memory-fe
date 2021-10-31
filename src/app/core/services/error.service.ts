import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import * as RouterActions from '../store/router/router.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../../app-state';
import {TranslateService} from '@ngx-translate/core';
import {ErrorType} from '../enums/error-type.enum';
import {Error} from '../model/error.model';
import {CallMode} from '../enums/call-mode.enum';
import {ModalNotifyComponent} from '../components/modals/modal-notify/modal-notify.component';
import {ModalMessageService} from './modal-message.service';

@Injectable({providedIn: 'root'})
export class ErrorService {

  constructor(
    private toast: ToastrService,
    private store: Store<AppState>,
    private translateService: TranslateService,
    private modalMessageService: ModalMessageService,
  ) {
  }

  processHttpError(response: HttpErrorResponse, gameType: string) {

    if (response.error) {
      const error = new Error(response.error);
      switch (error.type) {
        case ErrorType.VALIDATION:
          this.toast.warning(error.message);
          break;
        case ErrorType.SERVICE:
          this.toast.error(error.message);
          break;
        case ErrorType.UNEXPECTED:
          this.toast.error(error.message);
          break;
        case ErrorType.DUPLICATE:
          this.modalMessageService.openModal(ModalNotifyComponent, CallMode.DUPLICATE, gameType);
          break;
      }
    } else {
      switch (response.status) {
        case 401: {
          this.toast.error(this.translateService.instant('errors.invalid_credentials'));
          break;
        }
        case 417: {
          console.log('417');
          break;
        }
        default: {
          const errorMessage = (response.error && (response.error.message || response.error.description)) || response.message;
          this.toast.error(errorMessage);

          if (response.status === 404) {
            this.store.dispatch(RouterActions.goToHome());
          }
        }
      }
    }
  }

}
