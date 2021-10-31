import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BlackJackRoutingModule} from './black-jack-routing.module';
import {CoreModule} from '../../core/core.module';
import {BlackJackComponent} from './components/black-jack.component';
import {TranslateModule} from '@ngx-translate/core';
import {BlackJackGameComponent} from './components/black-jack-game/black-jack-game.component';
import {BlackJackGamerComponent} from './components/black-jack-game/gamer/black-jack-gamer.component';
import {BlackJackCardComponent} from './components/black-jack-game/card/black-jack-card.component';
import {BlackJackDealerComponent} from './components/black-jack-game/dealer/black-jack-dealer.component';
import {BlackJackBetFormComponent} from './components/black-jack-game/gamer/bet-form/black-jack-bet-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {
  AddSignToMoneyPipe,
  BlackJackBalanceAnimComponent
} from './components/black-jack-game/gamer/balance-anim/black-jack-balance-anim.component';
import {BlackJackCountdownComponent} from './components/black-jack-game/countdown/black-jack-countdown.component';
import {BlackJackConsoleComponent} from './components/black-jack-game/console/black-jack-console.component';
import {BlackJackConsoleMessageComponent} from './components/black-jack-game/console/message/black-jack-console-message.component';
import {BlackJackModalComponent} from './components/black-jack-game/modal/black-jack-modal.component';
import {BlackJackPotComponent} from './components/black-jack-game/pot/black-jack-pot.component';

@NgModule({
  declarations: [
    BlackJackComponent,
    BlackJackGameComponent,
    BlackJackGamerComponent,
    BlackJackCardComponent,
    BlackJackDealerComponent,
    BlackJackBetFormComponent,
    BlackJackBalanceAnimComponent,
    AddSignToMoneyPipe,
    BlackJackCountdownComponent,
    BlackJackConsoleComponent,
    BlackJackConsoleMessageComponent,
    BlackJackModalComponent,
    BlackJackPotComponent
  ],
  imports: [
    CoreModule,
    CommonModule,
    BlackJackRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
  ]
})
export class BlackJackModule {
}
