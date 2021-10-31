import * as ContactActions from './contact.actions';
import {createReducer, on} from '@ngrx/store';
import {Ack} from '../../model/ack.model';

export interface ContactState {
  ack: Ack;
}

export const initialState: ContactState = {
    ack: new Ack(null)
};

const reducer = createReducer(
  initialState,
  on(ContactActions.sendMailSuccess, (state, action) => {
    return {
        ack: new Ack(action.ack)
    };
  }),
);

export function contactReducer(state: ContactState | undefined, action) {
  return reducer(state, action);
}
