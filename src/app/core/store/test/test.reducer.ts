import * as TestActions from './test.actions';
import {createReducer, on} from '@ngrx/store';
import {Test} from './model/test.model';

export interface TestState {
    tests: Test[];
    test: Test;
}

export const initialState: TestState = {
    tests: [],
    test: new Test(null)
};

const reducer = createReducer(
    initialState,
    on(TestActions.getAllTestsSuccess, (state, action) => {
        return {
            ...state,
            tests: [...action.tests.map(value => new Test(value))]
        };
    }),
    on(TestActions.getTestSuccess, (state, action) => {
        return {
            ...state,
            test: new Test(action.test)
        };
    }),
    on(TestActions.saveTestSuccess, (state, action) => {
        return {
            ...state,
            tests: [...state.tests, new Test(action.test)]
        };
    }),
    on(TestActions.editTestSuccess, (state, action) => {
        return {
            ...state,
            tests: [...state.tests.map(value => value.id === action.test.id ? new Test(value) : value)]
        };
    }),
    on(TestActions.deleteTestSuccess, (state, action) => {
        return {
            ...state,
            tests: [...state.tests.filter(value => value.id !== action.test.id)]
        };
    }),
    on(TestActions.cleanTest, (state) => {
        return {
            ...state,
            tests: [],
            test: new Test(null)
        };
    })
);

export function testReducer(state: TestState | undefined, action) {
    return reducer(state, action);
}
