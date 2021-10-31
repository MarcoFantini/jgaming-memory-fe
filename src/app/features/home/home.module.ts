import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './components/home.component';
import {CoreModule} from '../../core/core.module';
import {HomeGameComponent} from './components/home-game/home-game.component';
import {HomeLoginComponent} from './components/home-login/home-login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [
    HomeComponent,
    HomeGameComponent,
    HomeLoginComponent
  ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        CoreModule,
        ReactiveFormsModule,
        TranslateModule
    ]
})
export class HomeModule { }
