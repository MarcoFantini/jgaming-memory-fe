import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {MinefieldGame} from '../../../../core/store/minefield/model/minefield-game.model';
import {User} from '../../../../core/store/user/model/user.model';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {RankUpdate} from '../../../../core/store/rank/model/rank-update.model';
import {Level} from '../../../../core/enums/level.enum';
import {GameType} from '../../../../core/enums/game-type.enum';
import {ModalNotifyComponent} from '../../../../core/components/modals/modal-notify/modal-notify.component';
import {TranslateService} from '@ngx-translate/core';
import {CellType} from '../../../../core/enums/cell-type.enum';
import {CallMode} from '../../../../core/enums/call-mode.enum';
import {
  COVERED_TO_VISIBLE_TIME,
  MinefieldCellAnimation,
  VISIBLE_TO_COVERED_TIME
} from '../../../../core/animations/minefield-cell-animations';
import {CellState} from '../../../../core/enums/cell-state.enum';


@Component({
  selector: 'app-minefield-game',
  templateUrl: './minefield-game.component.html',
  styleUrls: ['./minefield-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [MinefieldCellAnimation]
})

export class MinefieldGameComponent implements OnInit {

  @Input() game: MinefieldGame;
  @Input() loggedUser: User;
  @Input() result = true;
  @Input() gameType: GameType;
  @Output() back = new EventEmitter();
  @Output() saveRank = new EventEmitter<RankUpdate>();

  cellTypes: CellType[][];
  lives: number;
  treasures: number;
  modalRef: BsModalRef;
  point: number;
  frontState: CellState[][];
  backState: CellState[][];
  types = CellType;

  constructor(public modalService: BsModalService,
              private translateService: TranslateService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.initState();
    this.lives = this.game.life;
    this.treasures = 0;
  }

  initState() {
    this.cellTypes = new Array(this.game.row);
    this.frontState = new Array(this.game.row);
    this.backState = new Array(this.game.row);
    for (let i = 0; i < this.game.row; i++) {
      this.cellTypes[i] = new Array(this.game.row);
      this.frontState[i] = new Array(this.game.row);
      this.backState[i] = new Array(this.game.row);
    }
    let index = 0;
    for (let i = 0; i < this.game.row; i++) {
      for (let j = 0; j < this.game.row; j++) {
        this.frontState[i][j] = CellState.COVERED;
        this.backState[i][j] = CellState.VISIBLE;
        this.cellTypes[i][j] = CellType.GRASS_GREEN;
        index++;
      }
    }
  }

  lose() {
    if (!this.isShow()) {
      this.result = false;
      const rankUpdate = new RankUpdate(null);
      rankUpdate.result = false;
      rankUpdate.gameType = this.gameType;
      rankUpdate.userId = this.loggedUser.id;
      rankUpdate.victoryPoints = this.choosePoint();
      this.saveRank.emit(rankUpdate);
      const modalHeaderClass = this.gameType.toLowerCase();
      this.modalMessage('Hai perso', CallMode.EXPLODE, modalHeaderClass);
    }
  }


  win() {
    this.result = true;
    const rankUpdate = new RankUpdate(null);
    rankUpdate.result = true;
    rankUpdate.gameType = this.gameType;
    rankUpdate.userId = this.loggedUser.id;
    rankUpdate.victoryPoints = this.choosePoint();
    this.saveRank.emit(rankUpdate);
    const modalHeaderClass = this.gameType.toLowerCase();
    this.modalMessage('Hai vinto', CallMode.WIN, modalHeaderClass);
  }

  showBomb(i: number, j: number) {
    this.frontState[i][j] = CellState.VISIBLE;
    this.backState[i][j] = CellState.COVERED;
    this.cellTypes[i][j] = CellType.BOMB;
    this.lives--;
    setTimeout(() => {
      if (i !== 0) {
        if (j !== 0) {
          this.showCell(i - 1, j - 1);
        }
        if (j !== this.game.columns - 1) {
          this.showCell(i - 1, j + 1);
        }
        this.showCell(i - 1, j);
      }
      if (i !== this.game.columns - 1) {
        if (j !== 0) {
          this.showCell(i + 1, j - 1);
        }
        if (j !== this.game.columns - 1) {
          this.showCell(i + 1, j + 1);
        }
        this.showCell(i + 1, j);
      }
      if (j !== this.game.columns - 1) {
        this.showCell(i, j + 1);
      }
      if (j !== 0) {
        this.showCell(i, j - 1);
      }
      this.changeDetectorRef.detectChanges();
      if (this.lives <= 0) {
        this.lose();
      }
    }, VISIBLE_TO_COVERED_TIME + COVERED_TO_VISIBLE_TIME);
  }

  showCell(i: number, j: number) {
    const cell = this.game.cells[i][j];
    if (this.treasures === this.game.treasures && this.game.treasures !== 0) {
      return;
    }
    if (this.cellTypes[i][j] === CellType.GRASS_GREEN || this.cellTypes[i][j] === CellType.GRASS_ORANGE) {
      if (cell.bomb) {
        this.showBomb(i, j);
      } else {
        if (cell.treasure) {
          this.frontState[i][j] = CellState.VISIBLE;
          this.backState[i][j] = CellState.COVERED;
          this.cellTypes[i][j] = CellType.TREASURE;
          this.treasures++;
          if (this.treasures === this.game.treasures && !this.isShow()) {
            this.win();
          }
        } else {
          this.checkCell(i, j);
        }
      }
    } else {
      return;
    }
  }


  checkCell(i: number, j: number) {
    this.frontState[i][j] = CellState.VISIBLE;
    this.backState[i][j] = CellState.COVERED;
    this.cellTypes[i][j] = CellType.GRASS_BLACK;
    for (let k = i - 1; k <= i + 1; k++) {
      for (let m = j - 1; m <= j + 1; m++) {
        try {
          if (this.cellTypes[k][m] === CellType.GRASS_GREEN && this.game.cells[k][m].bomb) {
            this.frontState[i][j] = CellState.VISIBLE;
            this.backState[i][j] = CellState.COVERED;
            this.cellTypes[i][j] = CellType.GRASS_ORANGE;
          }
        } catch (e) {
        }
      }
    }
  }

  isShow() {
    return this.modalRef !== undefined;
  }

  choosePoint(): number {
    if (this.result === false) {
      return this.point = 0;
    }
    if (this.game.level === Level.HARD) {
      return this.point = 5;
    }
    if (this.game.level === Level.MEDIUM) {
      return this.point = 3;
    }
    if (this.game.level === Level.EASY) {
      return this.point = 1;
    }

  }


  modalMessage(title: string, result: CallMode, headerClass: string) {
    const currentTitle = this.translateService.instant(title);
    const callMode = this.translateService.instant(result);
    const modalHeaderClass = this.translateService.instant(headerClass);
    const initialState = {currentTitle, callMode, modalHeaderClass};
    this.modalRef = this.modalService.show(ModalNotifyComponent, {
      initialState
    });
    this.modalRef.content.action.subscribe(() => {
      this.back.emit();
    });
    return this.modalRef;
  }

}
