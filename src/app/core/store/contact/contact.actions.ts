import {createAction, props} from '@ngrx/store';
import {Contact} from './model/contact.model';
import {AckJSON} from '../../model/ack.model';

export const sendMail = createAction(
  '[Contact] Send Mail',
  props<{ contact: Contact }>()
);

export const sendMailSuccess = createAction(
  '[Contact] Sand Mail Success',
  props<{ ack: AckJSON}>()
);
