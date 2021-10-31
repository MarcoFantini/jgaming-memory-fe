import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MinefieldRoutingModule} from './minefield-routing.module';
import {CoreModule} from '../../core/core.module';
import {MinefieldComponent} from './components/minefield.component';
import {TranslateModule} from '@ngx-translate/core';
import {MinefieldInstancesComponent} from './components/minefield-instances/minefield-instances.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MinefieldGameComponent} from './components/minefield-game/minefield-game.component';
import {MinefieldSettingsComponent} from './components/minefield-settings/minefield-settings.component';

@NgModule({
  declarations: [
    MinefieldComponent,
    MinefieldSettingsComponent,
    MinefieldInstancesComponent,
    MinefieldGameComponent
  ],
  imports: [
    CoreModule,
    CommonModule,
    MinefieldRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class MinefieldModule {
}
