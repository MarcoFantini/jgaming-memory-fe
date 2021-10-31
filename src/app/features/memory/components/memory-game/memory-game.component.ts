import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {User} from '../../../../core/store/user/model/user.model';
import {RankUpdate} from '../../../../core/store/rank/model/rank-update.model';
import {GameType} from '../../../../core/enums/game-type.enum';
import {MemoryGame} from '../../../../core/store/memory/model/memory-game.model';
import {MemoryGusset} from '../../../../core/store/memory/model/memory-gusset.model';
import {CallMode} from '../../../../core/enums/call-mode.enum';
import {Role} from '../../../../core/enums/role.enum';
import {CellState} from '../../../../core/enums/cell-state.enum';
import {ModalMessageService} from '../../../../core/services/modal-message.service';
import {MemoryModalComponent} from '../../../../core/components/modals/memory-modal/memory-modal.component';
import {
  MemoryGussetAnimation,
  SHOW_AND_COVER_GUSSET_TIME,
  VISIBLE_TO_MATCHED_TIME
} from '../../../../core/animations/memory-gusset-animation';

@Component({
  selector: 'app-memory-game',
  templateUrl: './memory-game.component.html',
  animations: [MemoryGussetAnimation],
  styleUrls: ['./memory-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemoryGameComponent implements OnInit, OnDestroy {

  @Input() game: MemoryGame;
  @Input() loggedUser: User;
  @Output() back = new EventEmitter();
  @Output() rank = new EventEmitter<RankUpdate>();

  roles = Role;

  gussetToCompare: MemoryGusset;
  gussetToCompareId: number;
  inspectionMode: boolean;
  testerMode: boolean;
  frontState: CellState[];
  backState: CellState[];
  disabled: boolean;
  maxErrors: number;
  interval: NodeJS.Timer;
  totMatch: number;
  timer: number;
  bugfix: string;

  constructor(
    private modalMessageService: ModalMessageService,
    public changeDetectorRef: ChangeDetectorRef
  ) {
    this.gussetToCompareId = null;
    this.gussetToCompare = null;
    this.inspectionMode = false;
    this.testerMode = false;
    this.frontState = [null];
    this.backState = [null];
    this.bugfix = null;
    this.totMatch = 0;
  }

  ngOnInit() {
    this.initState();
    if (this.timer) {
      this.interval = setInterval(() => {
        if (this.timer > 0) {
          this.timer -= 1000;
          this.changeDetectorRef.detectChanges();
        } else {
          this.lose();
          clearInterval(this.interval);
        }
      }, 1000);
    }
    if (this.game.columns === 2) {
      this.bugfix = 'bugfix';
    }
    console.log(this.bugfix);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  findOut(gusset: MemoryGusset) {
    if (this.inspectionMode) {
      this.frontState[gusset.id] = CellState.COVERED;
    }
    this.showGusset(gusset.id);
    if (this.gussetToCompareId && this.gussetToCompareId !== gusset.id) {
      // make the other gusset un-clickable for the uncovering time
      this.makeOtherGussetUnClickAble(SHOW_AND_COVER_GUSSET_TIME);
    }
    if (this.gussetToCompare == null) { // the first gusset shot
      this.gussetToCompare = gusset;
      this.gussetToCompareId = gusset.id;
    } else // the second gusset shot
    if (this.gussetToCompareId !== gusset.id) {
      // make me sure they have different id
      if ((this.matchCouple(gusset, this.gussetToCompare))) {
        // ************* MATCHING ***************
        this.totMatch++;
        // waiting for gusset be completely revealed
        setTimeout(() => {
          this.maxErrors++;
          this.gussetToCompare = null;
          this.setGussetMatched(gusset.id);
          this.setGussetMatched(this.gussetToCompareId);
          // make the other gusset un-clickable for the matching time
          this.makeOtherGussetUnClickAble(VISIBLE_TO_MATCHED_TIME);
          this.changeDetectorRef.detectChanges();
        }, SHOW_AND_COVER_GUSSET_TIME);
        // waiting for the matching gusset to disappear before checking player win
        setTimeout(() => {
          this.win();
          this.changeDetectorRef.detectChanges();
        }, (SHOW_AND_COVER_GUSSET_TIME + VISIBLE_TO_MATCHED_TIME));
      } else {
        // ************* NOT-MATCHING ***************
        // waiting for not matching gusset be completely discovered
        setTimeout(() => {
          this.coverGusset(gusset.id);
          this.coverGusset(this.gussetToCompareId);
          this.gussetToCompare = null; // reset first click
          this.changeDetectorRef.detectChanges();
        }, SHOW_AND_COVER_GUSSET_TIME);
        // waiting for show and cover gusset time
        setTimeout(() => {
          this.maxErrors--; // output screen the effect of the mistake made
          this.lose(); // checking game over
          this.changeDetectorRef.detectChanges();
        }, SHOW_AND_COVER_GUSSET_TIME);
      }
    }
  }

  win(): void {
    if (this.totMatch === ((this.game.rows * this.game.columns) / 2)) {
      clearInterval(this.interval);
      this.timer = 0;
      this.modalMessageService.openModal(MemoryModalComponent,
        CallMode.WIN, GameType.MEMORY).content.onClose.subscribe(() => this.back.emit());
      this.saveNewRank(true);
    }
  }

  lose(): void {
    if (this.maxErrors === 0) {
      this.endGame();
      this.modalMessageService.openModal(MemoryModalComponent,
        CallMode.LOSE, GameType.MEMORY).content.onClose.subscribe(() => this.back.emit());
      this.saveNewRank(false);
      // tslint:disable-next-line:triple-equals
    } else if (this.timer <= 0 && !this.testerMode) {
      if (this.game.timer > 0) {
        this.endGame();
        this.modalMessageService.openModal(MemoryModalComponent,
          CallMode.TIMEOUT, GameType.MEMORY).content.onClose.subscribe(() => this.back.emit());
        this.saveNewRank(false);
      }
    }
  }

  surrender() {
    this.modalMessageService.openModal(MemoryModalComponent,
      CallMode.SURRENDER, GameType.MEMORY).content.onClose.subscribe(() => this.back.emit());
    this.endGame();
  }

  endGame() {
    this.timer = 0;
    clearInterval(this.interval);
  }

  matchCouple(gussetOne: MemoryGusset, gussetTwo: MemoryGusset): boolean {
    return gussetOne.name === gussetTwo.name;
  }

  coverGusset(i: number) {
    if (!this.inspectionMode) {
      this.frontState[i] = CellState.COVERED;
    }
    this.backState[i] = CellState.VISIBLE;
  }

  showGusset(i: number) {
    this.frontState[i] = CellState.VISIBLE;
    this.backState[i] = CellState.COVERED;
  }

  setGussetMatched(i: number) {
    this.frontState[i] = CellState.MATCHED;
    this.backState[i] = CellState.MATCHED;
  }

  makeOtherGussetUnClickAble(millisecond: number) {
    this.disabled = true;
    setTimeout(() => {
      this.disabled = false;
      this.changeDetectorRef.detectChanges();
    }, millisecond);
  }

  saveNewRank(result: boolean) {
    if (!this.testerMode) {
      const rankUpdateData = new RankUpdate(null);
      rankUpdateData.gameType = GameType.MEMORY;
      rankUpdateData.userId = this.loggedUser.id;
      rankUpdateData.result = result;
      if (result) {
        rankUpdateData.victoryPoints = this.game.victoryPoints;
      } else {
        rankUpdateData.victoryPoints = 0;
      }
      this.rank.emit(rankUpdateData);
    } else {

    }
  }

  initState() {
    this.maxErrors = this.game.maxErrors;
    this.timer = this.game.timer;
    let index = 0;
    for (let i = 0; i < this.game.rows; i++) {
      for (let j = 0; j < this.game.columns; j++) {
        this.coverGusset(index);
        index++;
      }
    }
  }

  setInspectionMode() {
    this.inspectionMode = true;
    let index = 0;
    for (let i = 0; i < this.game.rows; i++) {
      for (let j = 0; j < this.game.columns; j++) {
        this.frontState[index] = CellState.VISIBLE;
        index++;
      }
    }
    if (!this.testerMode) {
      this.modalMessageService.openModal(MemoryModalComponent, CallMode.TESTER, GameType.MEMORY);
    }
  }

  setTesterMode() {
    this.timer = 0;
    this.testerMode = true;
    clearInterval(this.interval);
    if (!this.inspectionMode) {
      this.modalMessageService.openModal(MemoryModalComponent, CallMode.TESTER, GameType.MEMORY);
    }
  }
}
