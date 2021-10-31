import {AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {StorageService} from '../../../../core/store/storage/services/storage.service';
import {BlackJackGame} from '../../../../core/store/blackjack/model/black-jack-game.model';
import {BlackJackGamerComponent} from './gamer/black-jack-gamer.component';
import {BlackJackConsoleService} from '../../../../core/services/black-jack-console.service';
import {BlackJackModalComponent} from './modal/black-jack-modal.component';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../../app-state';
import * as RankActions from '../../../../core/store/rank/rank.actions';
import * as BlackJackAction from '../../../../core/store/blackjack/black-jack.actions';
import * as BlackJackSelector from '../../../../core/store/blackjack/black-jack.selectors';
import {Subscription} from 'rxjs';
import {BlackJackEvent} from '../../../../core/store/blackjack/model/black-jack-event.model';
import {BlackJackGamerActionModel} from '../../../../core/store/blackjack/model/black-jack-gamer-action.model';
import {RankUpdate} from '../../../../core/store/rank/model/rank-update.model';
import {GameType} from '../../../../core/enums/game-type.enum';
import {BlackJackEventType} from '../../../../core/store/blackjack/model/black-jack-event-type.enum';
import {BlackJackGamerActionEnum} from '../../../../core/store/blackjack/model/black-jack-gamer-action-enum';
import {BlackJackGamePhase} from '../../../../core/store/blackjack/model/black-jack-game-phase';

@Component({
  selector: 'app-black-jack-game',
  templateUrl: './black-jack-game.component.html',
  styleUrls: ['./black-jack-game.component.scss']
})
export class BlackJackGameComponent implements AfterViewChecked, OnInit, OnDestroy {
  private subscriptions = new Subscription();

  @ViewChildren('_gamer') gamers: QueryList<BlackJackGamerComponent>;
  @ViewChild('blakjack', {static: false}) blackjack: ElementRef;
  @ViewChild('bjModal', {static: false}) bjModal: BlackJackModalComponent;

  isConnected: boolean;
  game: BlackJackGame;
  myChair: number;
  countdownTime: number;
  waiting: boolean;
  gamePhaseEnum = BlackJackGamePhase;

  constructor(
    private store: Store<AppState>,
    private storageService: StorageService,
    private consoleMessagesService: BlackJackConsoleService
  ) {
    this.isConnected = false;
    this.myChair = undefined;
    this.countdownTime = 0;
    this.waiting = false;
  }

  ngOnInit() {

    this.subscriptions.add(this.store.pipe(select(BlackJackSelector.getGame)).subscribe((game: BlackJackGame) => {
      // console.log(game);
      this.isConnected = true;
      this.game = game;
      // To resume game if user refresh page
      if (this.myChair === undefined && this.game.gamers) {
        this.game.gamers.forEach(gamer => {
          if (gamer && gamer.username === this.storageService.getStorage().user.username) {
            this.myChair = gamer.chair;
          }
        });
      }
    }));
    this.store.dispatch(BlackJackAction.subsToEvents());
    this.subscriptions.add(this.store.pipe(select(BlackJackSelector.getEvent)).subscribe((event: BlackJackEvent) => {
      // console.log(event);
      this.evaluateEvent(event);
    }));
  }

  ngOnDestroy(): void {
    this.saveRank();
    this.subscriptions.unsubscribe();
  }

  private whoIs(event) {
    return event.chair === -1 ? 'Il banco' : this.game.gamers[event.chair].username;
  }

  private evaluateEvent(event) {
    switch (event.eventType) {
      case BlackJackEventType.NEW_GAME: {
        break;
      }
      case BlackJackEventType.NEW_ROUND: {
        this.waiting = false;
        this.bjModal.show('NUOVO ROUND');
        break;
      }
      case BlackJackEventType.PLAYER_RECEIVE_CARD: {
        this.store.dispatch(BlackJackAction.addCardToPlayer({chair: event.chair, card: event.card}));
        break;
      }
      case BlackJackEventType.PLAYER_PLAY_HAND: {
        this.store.dispatch(BlackJackAction.setPlayedGamer({chair: event.chair}));
        if (event.chair !== -1) {
          this.consoleMessagesService.addMessage(this.whoIs(event) + ' gioca la mano');
        }
        break;
      }
      case BlackJackEventType.PLAYER_SET_BET: {
        this.consoleMessagesService.addMessage(this.whoIs(event) + ' punta ' + event.amount);
        this.store.dispatch(BlackJackAction.setGamerBalance({chair: event.chair, amount: event.amount}));
        this.playBalanceAnim(event.chair, -event.amount);
        break;
      }
      case BlackJackEventType.PLAYER_CALL_CARD: {
        this.store.dispatch(BlackJackAction.addCardToPlayer({chair: event.chair, card: event.card}));
        this.consoleMessagesService.addMessage(this.whoIs(event) + ' chiama una carta!');
        break;
      }
      case BlackJackEventType.PLAYER_HAS_BLACKJACK: {
        this.consoleMessagesService.addMessage(this.whoIs(event) + ' ha fatto blackjack!', 'green');
        break;
      }
      case BlackJackEventType.PLAYER_CHECK: {
        this.consoleMessagesService.addMessage(this.whoIs(event) + ' passa la mano');
        break;
      }
      case BlackJackEventType.PLAYER_WIN_HAND: {
        this.consoleMessagesService.addMessage(this.whoIs(event) + ' vince la mano!', 'green');
        this.playBalanceAnim(event.chair, event.amount);
        break;
      }
      case BlackJackEventType.PLAYER_LOSE_HAND: {
        this.consoleMessagesService.addMessage(this.whoIs(event) + ' perde la mano!', 'red');
        this.playBalanceAnim(event.chair, -event.amount);
        break;
      }
      case BlackJackEventType.PLAYER_DRAFT_HAND: {
        this.consoleMessagesService.addMessage(this.whoIs(event) + ' pareggia col banco');
        break;
      }
      case BlackJackEventType.PLAYER_LOSE_GAME: {
        this.consoleMessagesService.addMessage(this.whoIs(event) + ' perde il gioco', 'red');
        if (event.chair === this.myChair) {
          this.bjModal.show('Hai finito i fondi: perdi il gioco');
        }
        break;
      }
      case BlackJackEventType.DEALER_PLAY: {
        this.bjModal.show('IL BANCO GIOCA');
        break;
      }
      case BlackJackEventType.COUNTING_CARDS: {
        this.bjModal.show('CONTEGGIO CARTE');
        break;
      }
      case BlackJackEventType.END_ROUND: {
        this.saveRank();
        break;
      }
      case BlackJackEventType.COUNTDOWN_TIME: {
        this.countdownTime = event.amount;
        break;
      }
      default : {
        console.log('Event not recognize');
      }
    }
  }

  private playBalanceAnim(chair: number, amount: number) {
    setTimeout(() => {
      const gamer = this.gamers.find(g => g.chair === chair);
      gamer.playBalanceAnim(amount);
    });
  }

  ngAfterViewChecked() {
    if (this.bjModal !== undefined) {
      this.bjModal.fitParent(this.blackjack);
    }
  }

  onClickSitAndPlay(chair: number) {
    const username = this.storageService.getStorage().user.username;
    this.store.dispatch(BlackJackAction.sitAndPlay({username, chair}));
    this.myChair = chair;
    this.waiting = true;
  }

  onClickSetBet(chair: number, value: number) {
    this.store.dispatch(BlackJackAction.setBet({chair, value}));
  }

  onClickCallCard(chair: number) {
    this.store.dispatch(BlackJackAction.callCard({chair}));
  }

  onClickCheck(chair: number) {
    this.store.dispatch(BlackJackAction.check({chair}));
  }

  onClickLeaveGame(chair: number) {
    this.store.dispatch(BlackJackAction.leaveGame({chair}));
  }

  onClickResetGame() {
    this.myChair = undefined;
    this.store.dispatch(BlackJackAction.resetGame());
  }

  onGamerAction($event: BlackJackGamerActionModel) {
    switch ($event.action) {
      case BlackJackGamerActionEnum.CALL_CARD: {
        this.onClickCallCard($event.chair);
        break;
      }
      case BlackJackGamerActionEnum.SET_BET: {
        this.onClickSetBet($event.chair, $event.value);
        break;
      }
      case BlackJackGamerActionEnum.CHECK: {
        this.onClickCheck($event.chair);
        break;
      }
      case BlackJackGamerActionEnum.LEAVE_GAME: {
        this.onClickLeaveGame($event.chair);
        break;
      }
      default: {
        console.log('User action not recognize');
      }
    }
  }

  saveRank() {
    const blackJackGamer = this.game.gamers[this.myChair];
    if (blackJackGamer) {
      const rankUpdate = new RankUpdate(null);
      rankUpdate.userId = this.storageService.getStorage().user.id;
      rankUpdate.gameType = GameType.BLACKJACK;
      rankUpdate.result = true;
      rankUpdate.victoryPoints = blackJackGamer.balance;
      this.store.dispatch(RankActions.saveRank({rankUpdate}));
    }
  }

}
