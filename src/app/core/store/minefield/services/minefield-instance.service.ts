import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {MinefieldInstance, MinefieldInstanceJSON} from '../model/minefield-instance.model';
import {Ack, AckJSON} from '../../../model/ack.model';


@Injectable({providedIn: 'root'})
export class MinefieldInstanceService {
  readonly minefieldBaseURL: string = `${environment.apiUrl}/minefield-instances`;

  constructor(
    private http: HttpClient
  ) {
  }

  getAll(): Observable<Array<MinefieldInstanceJSON>> {
    return this.http.get<Array<MinefieldInstanceJSON>>(`${this.minefieldBaseURL}`);
  }

  save(instance: MinefieldInstance): Observable<AckJSON> {
    return this.http.post<AckJSON>(`${this.minefieldBaseURL}`, MinefieldInstance.toJSON(instance));
  }

  delete(id: number): Observable<MinefieldInstanceJSON> {
    return this.http.delete<MinefieldInstanceJSON>(`${this.minefieldBaseURL}/${id}`);
  }

  update(instance: MinefieldInstance): Observable<MinefieldInstanceJSON> {
    return this.http.put<MinefieldInstanceJSON>(`${this.minefieldBaseURL}`, MinefieldInstance.toJSON(instance));
  }

}
