import {createSelector} from '@ngrx/store';
import {TestState} from './test.reducer';
import {Test} from './model/test.model';
import {AppState} from '../../../app-state';

const root = (state: AppState): TestState => state.test;

export const getTests = createSelector(
    root,
    (state: TestState): Test[] => state.tests
);

export const getTest = createSelector(
    root,
    (state: TestState): Test => state.test
);
