import {Injectable} from '@angular/core';
import {CompatClient, Stomp} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {Observable, Subject} from 'rxjs';
import {BlackJackGame, BlackJackGameJSON} from '../model/black-jack-game.model';
import {BlackJackEvent, BlackJackEventJSON} from '../model/black-jack-event.model';
import {User} from '../../user/model/user.model';
import {StorageService} from '../../storage/services/storage.service';
import {environment} from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlackJackService {

  stompClient: CompatClient;

  /**
   * https://www.javaguides.net/2019/06/spring-boot-angular-8-websocket-example-tutorial.html
   * https://stackoverflow.com/questions/46132012/using-an-observable-to-detect-a-change-in-a-variable
   */
  game: Subject<BlackJackGameJSON>;
  game$: Observable<BlackJackGameJSON>;
  event: Subject<BlackJackEventJSON>;
  event$: Observable<BlackJackEventJSON>;

  user: User;

  constructor(private storageService: StorageService) {
    this.game = new Subject<BlackJackGame>();
    this.game$ = this.game.asObservable();
    this.event = new Subject<BlackJackEvent>();
    this.event$ = this.event.asObservable();
  }

  connect(): Observable<BlackJackGameJSON> {
    this.user = this.storageService.getStorage().user;

    const ws = new SockJS(`${environment.apiUrl}/blackjack?token=` + this.user.token);
    this.stompClient = Stomp.over(ws);
    this.stompClient.debug = () => {
    };
    this.stompClient.connect({}, (frame) => {
      // Canale privato
      this.stompClient.subscribe('/blackjack/getGame/' + this.user.username, (message) => {
        const game = JSON.parse(message.body);
        this.game.next(game);
      });
      // Canale pubblico
      this.stompClient.subscribe('/blackjack', (message) => {
        const game = JSON.parse(message.body);
        this.game.next(game);
      });
      // Canale pubblico
      this.stompClient.subscribe('/blackjack/event', (message) => {
        const event = JSON.parse(message.body);
        this.event.next(event);
      });
      this.getGame();
    }, this.errorCallBack);
    return this.game$;
  }

  subsToEvents(): Observable<BlackJackEvent> {
    return this.event$;
  }

  private getGame() {
    this.stompClient.publish({
      destination: '/app/blackjack/getGame/' + this.user.username
    });
  }

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error) {
    console.log('errorCallBack -> ' + error);
    setTimeout(() => {
      this.connect();
    }, 5000);
  }

  sitAndPlay(username: string, chair: number) {
    this.stompClient.publish({
      destination: '/app/blackjack/sitAndPlay/' + username + '-' + chair
    });
  }

  setBet(chair: number, value: number) {
    this.stompClient.publish({
      destination: '/app/blackjack/setBet/' + chair + '-' + value
    });
  }

  callCard(chair: number) {
    this.stompClient.publish({
      destination: '/app/blackjack/callCard/' + chair
    });
  }

  check(chair: number) {
    this.stompClient.publish({
      destination: '/app/blackjack/check/' + chair
    });
  }

  leaveGame(chair: number) {
    this.stompClient.publish({
      destination: '/app/blackjack/leaveGame/' + chair
    });
    this.disconnect();
  }

  resetGame() {
    this.stompClient.publish({
      destination: '/app/blackjack/resetGame'
    });
  }

}
