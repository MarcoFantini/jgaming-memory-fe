import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MinefieldComponent} from './components/minefield.component';

const MINEFIELD_ROUTER: Routes = [
  {
    path: '',
    component: MinefieldComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(MINEFIELD_ROUTER)],
  exports: [RouterModule]
})
export class MinefieldRoutingModule { }
