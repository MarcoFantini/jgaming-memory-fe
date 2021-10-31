import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

export class ConsoleMessage {
  text: string;
  color: string;

  constructor(text: string, color: string) {
    this.text = text;
    color != null ? this.color = color : this.color = null;
  }

}

@Component({
  selector: 'app-blackjack-console-message',
  templateUrl: './black-jack-console-message.component.html',
  styleUrls: ['./black-jack-console-message.component.scss']
})
export class BlackJackConsoleMessageComponent implements OnInit {
  @ViewChild('message', {static: false}) el: ElementRef;

  @Output() destroy = new EventEmitter<number>();
  @Input() text: string;
  @Input() color: string;

  constructor() {
  }

  ngOnInit() {
    this.text = '> ' + this.text;
    setTimeout(() => {
      this.removeFromDrom();
    }, 5000);
  }

  private removeFromDrom() {
    this.el.nativeElement.remove();
  }
}
