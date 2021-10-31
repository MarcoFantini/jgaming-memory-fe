import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs';
import {User, UserJSON} from '../model/user.model';
import {StorageService} from '../../storage/services/storage.service';
import {Login} from '../model/login.model';
import {AppState} from '../../../../app-state';
import {Store} from '@ngrx/store';

@Injectable({providedIn: 'root'})
export class UserService {
  readonly userBaseURL: string = `${environment.apiUrl}`;

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    private storageService: StorageService,
  ) {
  }

  login(login: Login): Observable<UserJSON> {
    return this.http.post<UserJSON>(`${this.userBaseURL}/user/login`, Login.toJSON(login));
  }

  save(user: User): Observable<UserJSON> {
    return this.http.post<UserJSON>(`${this.userBaseURL}/user`, User.toJSON(user));
  }

  getUser() {
    return this.storageService.getStorage().user;
  }

  storeUser(user: User) {
    const storage = this.storageService.getStorage();
    storage.user = user;
    this.storageService.saveStorage(storage);
  }

  logout() {
    return this.http.post(`${this.userBaseURL}/user/logout`, null);
  }

  unstoreUser() {
    const storage = this.storageService.getStorage();
    storage.user = null;
    this.storageService.saveStorage(storage);
    window.location.reload();
  }
}
