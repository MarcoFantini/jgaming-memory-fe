import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HTTP_INTERCEPTORS, HttpBackend, HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {reducers} from './app-reducers';
import {RouterState, StoreRouterConnectingModule} from '@ngrx/router-store';
import {EffectsModule} from '@ngrx/effects';
import {effects} from './app-effects';
import {ToastrModule} from 'ngx-toastr';
import {AlertModule, BsDatepickerModule, TooltipModule} from 'ngx-bootstrap';
import {CoreModule} from './core/core.module';
import {JwtInterceptor} from './core/interceptors/jwt.interceptor';
import {ModalModule} from 'ngx-bootstrap/modal';

export function HttpLoaderFactory(httpBackend: HttpBackend) {
  return new TranslateHttpLoader(new HttpClient(httpBackend), './assets/i18n/', '.json');
}

// defineLocale('it', itLocale);
// defineLocale('en', enGbLocale);
// registerLocaleData(localeIt, localeItExtra);
// registerLocaleData(localeEn, localeEnExtra);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxSpinnerModule,
    TooltipModule.forRoot(),
    BsDatepickerModule.forRoot(),
    StoreModule.forRoot(reducers,
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true
        }
      }
    ),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal
    }),
    EffectsModule.forRoot(effects),
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      resetTimeoutOnDuplicate: true
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpBackend]
      }
    }),
    CoreModule,
    ModalModule.forRoot(),
    AlertModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
