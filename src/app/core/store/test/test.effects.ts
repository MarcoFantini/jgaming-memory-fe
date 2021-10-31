import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import * as TestActions from './test.actions';
import {TestService} from './services/test.service';
import {TestJSON} from './model/test.model';

@Injectable({providedIn: 'root'})
export class TestEffects {

  constructor(
    private actions$: Actions,
    private testService: TestService
  ) {
  }

  getAllTestEffect$ = createEffect(() => this.actions$.pipe(
    ofType(TestActions.getAllTests),
    switchMap(
      (action) => this.testService.getAll()
        .pipe(
          map((tests: TestJSON[]) => TestActions.getAllTestsSuccess({tests})),
          catchError((err, caught) => caught)
        )
    )
  ));

  getTestEffect$ = createEffect(() => this.actions$.pipe(
    ofType(TestActions.getTest),
    switchMap(
      (action) => this.testService.get(action.id)
        .pipe(
          map((test: TestJSON) => TestActions.getTestSuccess({test})),
          catchError((err, caught) => caught)
        )
    )
  ));

  saveTestEffect$ = createEffect(() => this.actions$.pipe(
    ofType(TestActions.saveTest),
    switchMap(
      (action) => this.testService.save(action.test)
        .pipe(
          map((test: TestJSON) => TestActions.saveTestSuccess({test})),
          catchError((err, caught) => caught)
        )
    )
  ));

  editTestEffect$ = createEffect(() => this.actions$.pipe(
    ofType(TestActions.editTest),
    switchMap(
      (action) => this.testService.update(action.test)
        .pipe(
          map((test: TestJSON) => TestActions.editTestSuccess({test})),
          catchError((err, caught) => caught)
        )
    )
  ));

  deleteTestEffect$ = createEffect(() => this.actions$.pipe(
    ofType(TestActions.deleteTest),
    switchMap(
      (action) => this.testService.delete(action.id)
        .pipe(
          map((test: TestJSON) => TestActions.deleteTestSuccess({test})),
          catchError((err, caught) => caught)
        )
    )
  ));
}
