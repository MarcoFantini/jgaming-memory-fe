import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BlackJackGamer} from '../../../../../../core/store/blackjack/model/black-jack-gamer.model';

@Component({
  selector: 'app-blackjack-bet-form',
  templateUrl: './black-jack-bet-form.component.html',
  styleUrls: ['./black-jack-bet-form.component.scss']
})
export class BlackJackBetFormComponent implements OnInit {
  @Input() gamer: BlackJackGamer;
  @Output() submitBet = new EventEmitter<number>();

  form: FormGroup;

  constructor() {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = new FormGroup({
      bet: new FormControl(null, [
        Validators.required, Validators.min(1),
        Validators.max(this.gamer.balance),
        Validators.pattern(/^[0-9]*$/)
      ])
    });
  }

  onSubmit() {
    this.submitBet.emit(this.form.controls['bet'].value);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

}
