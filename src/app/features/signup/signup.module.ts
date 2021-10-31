import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignupComponent} from './components/signup.component';
import {SignupRoutingModule} from './signup-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {CoreModule} from '../../core/core.module';

@NgModule({
    declarations: [
        SignupComponent
    ],
    imports: [
        CommonModule,
        SignupRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        CoreModule
    ]
})
export class SignupModule {
}
