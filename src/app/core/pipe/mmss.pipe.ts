import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'mmss'
})
export class MmssPipe implements PipeTransform {

  minute: number;
  second: number;
  countdown: string;

  transform(attesa: number, args?: any): string {
    this.minute = Math.floor(attesa / 60000);
    this.second = Math.floor((attesa - this.minute * 60000) / 1000);
    this.countdown = this.settingTimerMode(this.minute, '0', 2)
      + ':' + this.settingTimerMode(this.second, '0', 2);
    return this.countdown;
  }

  settingTimerMode(num: number, zero: string, length: number): string {
    return (new Array(length + 1).join(zero) + num).slice(-length);
  }

}
