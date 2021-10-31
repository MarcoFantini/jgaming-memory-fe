import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {MinefieldGame} from '../model/minefield-game.model';

@Injectable({providedIn: 'root'})
export class MinefieldGameService {
  readonly minefieldBaseURL: string = `${environment.apiUrl}/minefield-game`;

  constructor(
    private http: HttpClient
  ) { }

  get(id: number): Observable<MinefieldGame> {
    return this.http.get<MinefieldGame>(`${this.minefieldBaseURL}/` + id);
  }

}
