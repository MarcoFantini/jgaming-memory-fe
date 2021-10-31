import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContactComponent} from './components/contact.component';


const CONTACT_ROUTER: Routes = [
  {
    path: '',
    component: ContactComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(CONTACT_ROUTER)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
