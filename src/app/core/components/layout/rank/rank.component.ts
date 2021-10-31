import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../../app-state';
import * as RankActions from '../../../store/rank/rank.actions';
import * as RankSelectors from '../../../store/rank/rank.selectors';
import {Rank} from '../../../store/rank/model/rank.model';
import {GameType} from '../../../enums/game-type.enum';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.scss']
})
export class RankComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  @Input() gameType: GameType;

  ranks: Rank[];
  gameTableClass: string;

  constructor(
      private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.gameTableClass = 'table-' + this.gameType.toLowerCase();
    this.store.dispatch(RankActions.getAllRanks({ gameType: this.gameType }));
    this.subscriptions.add(this.store.pipe(select(RankSelectors.getRanks)).subscribe((ranks: Rank[]) => {
      this.ranks = ranks;
    }));
  }

  ngOnDestroy() {
    this.store.dispatch(RankActions.clean());
    this.subscriptions.unsubscribe();
  }

}
