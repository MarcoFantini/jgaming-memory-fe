import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {GameType} from '../../../core/enums/game-type.enum';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../app-state';
import {Subscription} from 'rxjs';
import {MinefieldGame} from '../../../core/store/minefield/model/minefield-game.model';
import * as MinefieldActions from '../../../core/store/minefield/minefield.actions';
import * as MinefieldSelectors from '../../../core/store/minefield/minefield.selectors';
import * as RankActions from '../../../core/store/rank/rank.actions';
import {MinefieldInstance} from '../../../core/store/minefield/model/minefield-instance.model';
import {PageStatus} from '../../../core/enums/page-status.enum';
import {Router} from '@angular/router';
import {User} from '../../../core/store/user/model/user.model';
import {StorageService} from '../../../core/store/storage/services/storage.service';
import * as CoreActions from '../../../core/store/core/core.actions';
import {RankUpdate} from '../../../core/store/rank/model/rank-update.model';
import {Ack} from '../../../core/model/ack.model';
import {CallMode} from '../../../core/enums/call-mode.enum';
import {ModalNotifyComponent} from '../../../core/components/modals/modal-notify/modal-notify.component';
import {BsModalService} from 'ngx-bootstrap/modal';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-minefield',
  templateUrl: './minefield.component.html',
  styleUrls: ['./minefield.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MinefieldComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  pageStatuses = PageStatus;
  gameType = GameType.MINEFIELD;
  instances: MinefieldInstance[];
  pageStatus: PageStatus = PageStatus.LOBBY;
  game: MinefieldGame;
  selectedInstance: MinefieldInstance;
  loggedUser: User;
  openModal: boolean;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private storageService: StorageService,
    private modalService: BsModalService,
    private translateService: TranslateService
  ) {
  }

  ngOnInit() {
    this.store.dispatch(CoreActions.changeGame({gameType: this.gameType}));
    this.store.dispatch(MinefieldActions.getAllInstances());
    this.subscriptions.add(this.store.pipe(select(MinefieldSelectors.getInstances)).subscribe((instances: MinefieldInstance[]) => {
      this.instances = instances;
    }));
    this.subscriptions.add(this.store.pipe(select(MinefieldSelectors.getGame)).subscribe((game: MinefieldGame) => {
      this.game = game;
      if (this.game) {
        this.pageStatus = PageStatus.GAME;
      }
    }));
    this.loggedUser = this.storageService.getStorage().user;
    this.openModal = false;
  }

  ngOnDestroy() {
    this.store.dispatch(MinefieldActions.clean());
    this.subscriptions.unsubscribe();
  }

  newHandler() {
    this.pageStatus = PageStatus.CONFIGURATION;
  }

  playHandler(id: number) {
    this.store.dispatch(MinefieldActions.getGame({id}));
  }

  editHandler(instance: MinefieldInstance) {
    this.selectedInstance = instance;
    this.pageStatus = PageStatus.CONFIGURATION;
  }

  deleteHandler(id: number) {
    this.store.dispatch(MinefieldActions.deleteInstance({id}));
  }

  editInstance(instance: MinefieldInstance) {
    this.store.dispatch(MinefieldActions.editInstance({instance}));
  }

  saveInstance(instance: MinefieldInstance) {
    this.store.dispatch(MinefieldActions.saveInstance({instance}));
    this.subscriptions.add(this.store.pipe(select(MinefieldSelectors.check)).subscribe((ack: Ack) => {
      if (ack && ack.result && !this.openModal) {
        this.modalMessage(CallMode.NEW_INSTANCE);
      }
    }));
  }

  saveRank(rankUpdate: RankUpdate) {
    this.store.dispatch(RankActions.saveRank({rankUpdate}));
  }

  modalMessage(result: CallMode) {
    const modalHeaderClass = this.translateService.instant(GameType.MINEFIELD.toLowerCase());
    const modalButtonClass = this.translateService.instant(GameType.MINEFIELD.toLowerCase()) + '-btn';
    const callMode = this.translateService.instant(result);
    const initialState = {callMode, modalHeaderClass, modalButtonClass};
    const bsModalRef = this.modalService.show(ModalNotifyComponent, {
      initialState
    });
    bsModalRef.content.action.subscribe(() => {
      this.backHandler();
    });
    this.openModal = true;
    return bsModalRef;
  }

  public backHandler() {
    this.store.dispatch(MinefieldActions.getAllInstances());
    this.store.dispatch(RankActions.getAllRanks({gameType: this.gameType}));
    this.selectedInstance = null;
    this.pageStatus = PageStatus.LOBBY;
  }
}
