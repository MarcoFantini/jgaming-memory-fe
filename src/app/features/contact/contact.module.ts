import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContactRoutingModule} from './contact-routing.module';
import {ContactComponent} from './components/contact.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {CoreModule} from '../../core/core.module';
import {AlertModule} from 'ngx-bootstrap';

@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    CoreModule,
    AlertModule
  ]
})
export class ContactModule {
}
