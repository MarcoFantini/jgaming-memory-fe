import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'AddSignToMoney'})
export class AddSignToMoneyPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value > 0 ? '+' + value : value;
  }

}

@Component({
  selector: 'app-blackjack-balance-anim',
  templateUrl: './black-jack-balance-anim.component.html',
  styleUrls: ['./black-jack-balance-anim.component.scss']
})
export class BlackJackBalanceAnimComponent implements OnInit {
  money: number;
  inPlay: boolean;

  constructor() {
  }

  ngOnInit() {
    this.inPlay = false;
  }

  setMoney(value: number) {
    this.money = value;
  }

  play() {
    this.inPlay = true;
    setTimeout(() => {
      this.inPlay = false;
    }, 3000);
  }
}
