import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuComponent} from './components/layout/menu/menu.component';
import {AlertModule, ModalModule, TooltipModule} from 'ngx-bootstrap';
import {TranslateModule} from '@ngx-translate/core';
import {FooterComponent} from './components/layout/footer/footer.component';
import {RankComponent} from './components/layout/rank/rank.component';
import {IsLoggedDirective} from './directives/is-logged.directive';
import {HasRoleDirective} from './directives/has-role.directive';
import {ModalNotifyComponent} from './components/modals/modal-notify/modal-notify.component';
import {ModalRulesComponent} from './components/modals/modal-rules/modal-rules.component';
import {RouterModule} from '@angular/router';
import {FooterGameComponent} from './components/layout/footer-game/footer-game.component';
import {MenuGameComponent} from './components/layout/menu-game/menu-game.component';
import {AckComponent} from './components/layout/ack/ack.component';
import {ModalConfirmComponent} from './components/modals/modal-confirm/modal-confirm.component';
import { MemoryModalComponent } from './components/modals/memory-modal/memory-modal.component';

@NgModule({
  declarations: [
    MenuComponent,
    MenuGameComponent,
    FooterComponent,
    FooterGameComponent,
    RankComponent,
    IsLoggedDirective,
    HasRoleDirective,
    ModalRulesComponent,
    ModalNotifyComponent,
    ModalConfirmComponent,
    AckComponent,
    MemoryModalComponent
  ],
  imports: [
    CommonModule,
    TooltipModule,
    TranslateModule,
    ModalModule,
    AlertModule,
    RouterModule
  ],
  exports: [
    MenuComponent,
    MenuGameComponent,
    FooterComponent,
    FooterGameComponent,
    RankComponent,
    IsLoggedDirective,
    HasRoleDirective,
    ModalRulesComponent,
    ModalNotifyComponent
  ],
  entryComponents: [
    ModalRulesComponent,
    ModalNotifyComponent,
    ModalConfirmComponent,
    MemoryModalComponent
  ]
})
export class CoreModule {
}
