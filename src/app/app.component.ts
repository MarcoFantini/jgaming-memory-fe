import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {BsLocaleService} from 'ngx-bootstrap';
import {Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from './app-state';
import * as CoreSelectors from './core/store/core/core.selectors';
import {GameType} from './core/enums/game-type.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private subscriptions = new Subscription();

  mainClass: string;

  constructor(
      private translate: TranslateService,
      private localeService: BsLocaleService,
      private store: Store<AppState>
  ) {
    const userLang = navigator.language || navigator['userLanguage'];
    const language = userLang.split('-')[0];

    this.translate.setDefaultLang('it'); // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.use(language); // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.localeService.use(language);
  }

  ngOnInit() {
    this.subscriptions.add(this.store.pipe(select(CoreSelectors.getGameType)).subscribe((gameType: GameType) => {
      setTimeout(() => {
        this.mainClass = gameType.toLowerCase();
      });
    }));
  }

}
