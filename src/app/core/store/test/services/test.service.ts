import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {Test, TestJSON} from '../model/test.model';

@Injectable({ providedIn: 'root' })
export class TestService {
  readonly testBaseURL: string = `${environment.apiUrl}`;

  constructor(
      private http: HttpClient
  ) { }

  getAll(): Observable<Array<TestJSON>> {
    return this.http.get<Array<TestJSON>>(`${this.testBaseURL}/tests`);
  }

  get(id: number): Observable<TestJSON> {
    return this.http.get<TestJSON>(`${this.testBaseURL}/tests/${id}`);
  }

  save(test: Test): Observable<TestJSON> {
    return this.http.post<TestJSON>(`${this.testBaseURL}/tests`, Test.toJSON(test));
  }

  update(test: Test): Observable<TestJSON> {
    return this.http.put<TestJSON>(`${this.testBaseURL}/tests`, Test.toJSON(test));
  }

  delete(id: number): Observable<TestJSON> {
    return this.http.delete<TestJSON>(`${this.testBaseURL}/tests/${id}`);
  }
}
