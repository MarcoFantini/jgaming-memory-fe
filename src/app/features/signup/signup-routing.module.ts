import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignupComponent} from './components/signup.component';

const SIGNUP_ROUTER: Routes = [
  {
    path: '',
    component: SignupComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(SIGNUP_ROUTER)],
  exports: [RouterModule]
})
export class SignupRoutingModule { }
