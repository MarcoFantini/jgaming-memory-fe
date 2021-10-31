import {Injectable} from '@angular/core';
import {ConsoleMessage} from '../../features/black-jack/components/black-jack-game/console/message/black-jack-console-message.component';

@Injectable({
  providedIn: 'root'
})
export class BlackJackConsoleService {

  messages: Array<ConsoleMessage>;

  constructor() {
    this.messages = new Array<ConsoleMessage>();
  }

  addMessage(text: string, color?: string) {
    this.messages.push(new ConsoleMessage(text, color));
  }

}
