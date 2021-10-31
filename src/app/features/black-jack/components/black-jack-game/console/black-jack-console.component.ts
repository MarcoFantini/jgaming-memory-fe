import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {BlackJackConsoleService} from '../../../../../core/services/black-jack-console.service';
import {ConsoleMessage} from './message/black-jack-console-message.component';

@Component({
  selector: 'app-blackjack-console',
  templateUrl: './black-jack-console.component.html',
  styleUrls: ['./black-jack-console.component.scss']
})
export class BlackJackConsoleComponent implements AfterViewInit {
  @ViewChild('console', {static: false}) console: ElementRef;

  messages: Array<ConsoleMessage>;

  constructor(private consoleService: BlackJackConsoleService) {
    this.messages = consoleService.messages;
  }


  ngAfterViewInit() {
    // Fix container's height at computed height
    this.console.nativeElement.style.maxHeight = this.console.nativeElement.offsetHeight + 'px';
  }

}
