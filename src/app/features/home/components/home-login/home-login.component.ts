import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Login} from '../../../../core/store/user/model/login.model';

@Component({
  selector: 'app-home-login',
  templateUrl: './home-login.component.html',
  styleUrls: ['./home-login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeLoginComponent implements OnInit {

  @Output() login = new EventEmitter<Login>();

  form: FormGroup;
  submitted: boolean;

  constructor() { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  loginHandler() {
    this.submitted = true;

    if (this.form.valid) {
      const loginData = this.form.value as Login;
      this.login.emit(loginData);
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }
}
