import {createSelector} from '@ngrx/store';
import {ContactState} from './contact.reducer';
import {AppState} from '../../../app-state';
import {Ack} from '../../model/ack.model';

const root = (state: AppState): ContactState => state.contact;

export const checkSend = createSelector(
  root,
  (state: ContactState): Ack => state.ack
);
