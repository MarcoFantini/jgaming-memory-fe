import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {RankJSON} from '../model/rank.model';
import {GameType} from '../../../enums/game-type.enum';
import {RankUpdate} from '../model/rank-update.model';

@Injectable({providedIn: 'root'})
export class RankService {
  readonly rankBaseURL: string = `${environment.apiUrl}`;

  constructor(
    private http: HttpClient
  ) {
  }

  save(rankUpdate: RankUpdate) {
    return this.http.post(`${this.rankBaseURL}/ranks`, RankUpdate.toJSON(rankUpdate));
  }

  getAll(gameType: GameType): Observable<Array<RankJSON>> {
    return this.http.get<Array<RankJSON>>(`${this.rankBaseURL}/ranks/${gameType}`);
  }

}
