import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../app-state';
import * as MemoryActions from '../../../core/store/memory/memory.actions';
import * as MemoryInstancesActions from '../../../core/store/memory/memory.actions';
import * as MemorySelectors from '../../../core/store/memory/memory.selectors';
import * as CoreActions from '../../../core/store/core/core.actions';
import {GameType} from '../../../core/enums/game-type.enum';
import {PageStatus} from '../../../core/enums/page-status.enum';
import {Router} from '@angular/router';
import {StorageService} from '../../../core/store/storage/services/storage.service';
import {User} from '../../../core/store/user/model/user.model';
import {MemoryInstance} from '../../../core/store/memory/model/memory-instance.model';
import {MemoryGame} from '../../../core/store/memory/model/memory-game.model';
import {RankUpdate} from '../../../core/store/rank/model/rank-update.model';
import * as RankActions from '../../../core/store/rank/rank.actions';
import {Ack} from '../../../core/model/ack.model';
import {CallMode} from '../../../core/enums/call-mode.enum';
import {ModalMessageService} from '../../../core/services/modal-message.service';
import {ModalNotifyComponent} from '../../../core/components/modals/modal-notify/modal-notify.component';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MemoryComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  gameType = GameType.MEMORY;
  pageStatuses = PageStatus;

  pageStatus: PageStatus = PageStatus.LOBBY;
  selectedInstance: MemoryInstance;
  instances: MemoryInstance[];
  callMode: CallMode;
  loggedUser: User;
  game: MemoryGame;
  openModal: boolean;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private storageService: StorageService,
    private modalMessageService: ModalMessageService
  ) {
  }

  ngOnInit() {
    this.store.dispatch(CoreActions.changeGame({gameType: this.gameType}));
    this.store.dispatch(MemoryActions.getAllInstances());
    this.subscriptions.add(this.store.pipe(select(MemorySelectors.getInstances)).subscribe((instances: MemoryInstance[]) => {
      this.instances = instances;
    }));
    this.subscriptions.add(this.store.pipe(select(MemorySelectors.getGame)).subscribe((game: MemoryGame) => {
      this.game = game;
      if (this.game) {
        this.pageStatus = PageStatus.GAME;
      }
    }));
    this.subscriptions.add(this.store.pipe(select(MemorySelectors.check)).subscribe((ack: Ack) => {
      if (ack && ack.result) {
        this.modalMessageService.openModal(ModalNotifyComponent, this.callMode, this.gameType).content.onClose.subscribe(() => {
          this.backHandler();
        });
      }
    }));
    this.loggedUser = this.storageService.getStorage().user;
    this.openModal = false;
  }

  ngOnDestroy() {
    this.store.dispatch(MemoryActions.clean());
    this.subscriptions.unsubscribe();
  }

  newHandler() {
    this.pageStatus = PageStatus.CONFIGURATION;
  }

  playHandler(id: number) {
    this.store.dispatch(MemoryActions.getGame({id}));
  }

  editHandler(instance: MemoryInstance) {
    this.selectedInstance = instance;
    this.pageStatus = PageStatus.CONFIGURATION;
  }

  deleteHandler(id: number) {
    this.store.dispatch(MemoryActions.deleteInstance({id}));
  }

  backHandler() {
    this.store.dispatch(MemoryActions.getAllInstances());
    this.store.dispatch(RankActions.getAllRanks({gameType: this.gameType}));
    this.pageStatus = PageStatus.LOBBY;
    this.selectedInstance = null;
    this.openModal = false;
  }

  saveNewRank(rankUpdateData: RankUpdate) {
    this.store.dispatch(RankActions.saveRank({rankUpdate: rankUpdateData}));
  }

  editInstance(instance: MemoryInstance) {
    this.store.dispatch(MemoryInstancesActions.editInstance({instance}));
    this.callMode = CallMode.EDIT_INSTANCE;
  }

  saveNewInstance(instance: MemoryInstance) {
    this.store.dispatch(MemoryInstancesActions.saveInstance({instance}));
    this.callMode = CallMode.NEW_INSTANCE;
  }
}
