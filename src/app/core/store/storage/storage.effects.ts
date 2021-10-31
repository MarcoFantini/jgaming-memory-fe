import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {switchMapTo, tap} from 'rxjs/operators';
import * as StorageActions from './storage.actions';
import {StorageService} from './services/storage.service';

@Injectable({ providedIn: 'root' })
export class StorageEffects {

    constructor(
        private actions$: Actions,
        private storageService: StorageService
    ) { }

    getStorageEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StorageActions.getStorage),
            switchMapTo([StorageActions.getStorageSuccess({ storage: this.storageService.getStorage() })])
        ),
    );

    saveStorageEffect$ = createEffect(() => this.actions$.pipe(
        ofType(StorageActions.saveStorage),
        tap(action => {
            this.storageService.saveStorage(action.storage);
        })
        ), {dispatch: false}
    );

}
