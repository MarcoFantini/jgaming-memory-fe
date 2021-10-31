import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {MemoryGameJSON} from '../model/memory-game.model';

@Injectable({providedIn: 'root'})
export class MemoryGameService {
  readonly memoryBaseURL: string = `${environment.apiUrl}/memory-game`;

  constructor(
    private http: HttpClient
  ) {
  }

  get(id: number): Observable<MemoryGameJSON> {
    return this.http.get<MemoryGameJSON>(`${this.memoryBaseURL}/${id}`);
  }

}
