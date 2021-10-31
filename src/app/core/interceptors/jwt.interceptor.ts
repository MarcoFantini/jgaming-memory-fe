import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import * as UserSelectors from '../../core/store/user/user.selectors';
import {catchError, switchMap, take} from 'rxjs/operators';
import {AppState} from '../../app-state';
import {ErrorService} from '../services/error.service';
import {environment} from '../../../environments/environment';
import {User} from '../store/user/model/user.model';

@Injectable({providedIn: 'root'})
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private store: Store<AppState>,
    private errorService: ErrorService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select(UserSelectors.getUser).pipe(
      // Interceptor requires observable that complete
      // BETTER than first: avoid errors if there is no value
      take(1),
      switchMap((user: User) => {
        const isInternalUrl = req.url.startsWith(environment.apiUrl);
        const authReq = isInternalUrl && !!user.token ? req.clone({
          setHeaders: {Authorization: 'Bearer ' + user.token},
        }) : req;
        return next.handle(authReq)
          .pipe(
            catchError(err => {
              if (err instanceof HttpErrorResponse) {
                this.errorService.processHttpError(err,
                  authReq.url.substring((environment.apiUrl.length + 1), authReq.url.indexOf('-')));
              }

              return of(err);
              // return throwError(err);
            }),
          );
      }),
    );
  }
}
