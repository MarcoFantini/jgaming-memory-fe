import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../core/store/user/model/user.model';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../../app-state';
import * as UserActions from '../../../core/store/user/user.actions';
import {Role} from '../../../core/enums/role.enum';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  submitted: boolean;

  constructor(
      private router: Router,
      private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = new FormGroup({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      presentation: new FormControl(null)
    });
  }

  registerHandler() {
    this.submitted = true;

    if (this.form.valid) {
      const user = { ...this.form.value as User, role: Role.GAMER };
      this.store.dispatch(UserActions.saveUser({user }));
      this.router.navigate(['']);
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }


}
