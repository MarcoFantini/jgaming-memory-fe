import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ContactService} from './services/contact.service';
import * as ContactActions from './contact.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {AckJSON} from '../../model/ack.model';

@Injectable({providedIn: 'root'})
export class ContactEffects {

  constructor(
    private actions$: Actions,
    private contactService: ContactService
  ) { }

  sandMailEffect$ = createEffect(() => this.actions$.pipe(
    ofType(ContactActions.sendMail),
    switchMap(
      (action) => this.contactService.sendMail(action.contact)
        .pipe(
          map((ack: AckJSON) => ContactActions.sendMailSuccess({ ack })),
          catchError((err, caught) => caught)
        )
    )
  ));

}
