import {createAction, props} from '@ngrx/store';
import {Test, TestJSON} from './model/test.model';

export const getAllTests = createAction(
  '[Test] Get All Tests'
);

export const getAllTestsSuccess = createAction(
  '[Test] Get All Tests Success',
  props<{ tests: TestJSON[] }>()
);

export const getTest = createAction(
  '[Test] Get Test',
  props<{ id: number }>()
);

export const getTestSuccess = createAction(
  '[Test] Get Test Success',
  props<{ test: TestJSON }>()
);

export const saveTest = createAction(
  '[Test] Save Test',
  props<{ test: Test }>()
);

export const saveTestSuccess = createAction(
  '[Test] Save Test Success',
  props<{ test: TestJSON }>()
);

export const editTest = createAction(
  '[Test] Edit Test',
  props<{ test: Test }>()
);

export const editTestSuccess = createAction(
  '[Test] Edit Test Success',
  props<{ test: TestJSON }>()
);

export const deleteTest = createAction(
  '[Test] Delete Test',
  props<{ id: number }>()
);

export const deleteTestSuccess = createAction(
  '[Test] Delete Test Success',
  props<{ test: TestJSON }>()
);

export const cleanTest = createAction(
  '[Test] Clean Test'
);
