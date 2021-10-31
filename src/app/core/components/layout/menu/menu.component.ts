import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {BsLocaleService} from 'ngx-bootstrap';
import {Router} from '@angular/router';
import {AppState} from '../../../../app-state';
import {Store} from '@ngrx/store';
import * as UserActions from '../../../store/user/user.actions';
import {StorageService} from '../../../store/storage/services/storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {

  flags = ['it', 'en'];

  constructor(
    private translate: TranslateService,
    private localeService: BsLocaleService,
    private router: Router,
    private store: Store<AppState>,
    private storageService: StorageService
  ) { }

  changeLanguageHandler(lang: string) {
    this.translate.use(lang);
    this.localeService.use(lang);
  }

  onClickLogout() {
    this.store.dispatch(UserActions.logout());
  }

  isUserLogged() {
    return this.storageService.getStorage().user;
  }
}
