import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../../core/store/storage/services/storage.service';
import {Login} from '../../../core/store/user/model/login.model';
import * as UserActions from '../../../core/store/user/user.actions';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../app-state';
import * as UserSelector from '../../../core/store/user/user.selectors';
import {User} from '../../../core/store/user/model/user.model';
import {Subscription} from 'rxjs';
import * as CoreActions from '../../../core/store/core/core.actions';
import {GameType} from '../../../core/enums/game-type.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private subscriptions = new Subscription();

  isLogged: boolean;

  constructor(
      private storageService: StorageService,
      private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(CoreActions.changeGame({ gameType: GameType.HOME }));

    if (this.storageService.getStorage().user) {
      this.isLogged = true;
    } else {
      this.subscriptions.add(this.store.pipe(select(UserSelector.getUser)).subscribe((user: User) => {
        if (user && (Object.keys(user).length !== 0)) {
          this.isLogged = true;
          window.location.reload();
        }
      }));
    }
  }

  loginHandler(login: Login): void {
    this.store.dispatch(UserActions.login({ login }));
  }

}
