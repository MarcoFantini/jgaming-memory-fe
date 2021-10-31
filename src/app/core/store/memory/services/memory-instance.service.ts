import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {MemoryInstance, MemoryInstanceJSON} from '../model/memory-instance.model';
import {AckJSON} from '../../../model/ack.model';

@Injectable({providedIn: 'root'})
export class MemoryInstanceService {
  readonly memoryBaseURL: string = `${environment.apiUrl}/memory-instances`;

  constructor(
    private http: HttpClient
  ) {
  }

  getAll(): Observable<Array<MemoryInstanceJSON>> {
    return this.http.get<Array<MemoryInstanceJSON>>(`${this.memoryBaseURL}`);
  }

  save(instance: MemoryInstance): Observable<AckJSON> {
    return this.http.post<AckJSON>(`${this.memoryBaseURL}`, MemoryInstance.toJSON(instance));
  }

  delete(id: number): Observable<MemoryInstanceJSON> {
    return this.http.delete<MemoryInstanceJSON>(`${this.memoryBaseURL}/${id}`);
  }

  update(instance: MemoryInstance): Observable<AckJSON> {
    return this.http.put<AckJSON>(`${this.memoryBaseURL}`, MemoryInstance.toJSON(instance));
  }

}
