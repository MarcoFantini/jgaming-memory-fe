import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './core/guards/auth.guard';

const APP_ROUTER: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'minefield',
    loadChildren: () => import('./features/minefield/minefield.module').then(m => m.MinefieldModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'blackjack',
    loadChildren: () => import('./features/black-jack/black-jack.module').then(m => m.BlackJackModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'memory',
    loadChildren: () => import('./features/memory/memory.module').then(m => m.MemoryModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'signup',
    loadChildren: () => import('./features/signup/signup.module').then(m => m.SignupModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./features/contact/contact.module').then(m => m.ContactModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTER)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
