import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BlackJackComponent} from './components/black-jack.component';

const BLACK_JACK_ROUTES: Routes = [
  {
    path: '',
    component: BlackJackComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(BLACK_JACK_ROUTES)],
  exports: [RouterModule]
})
export class BlackJackRoutingModule { }
