import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home.component';

const HOME_ROUTER: Routes = [
  {
    path: '',
    component: HomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(HOME_ROUTER)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
