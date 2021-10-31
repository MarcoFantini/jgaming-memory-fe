import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Contact} from '../../../core/store/contact/model/contact.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../../app-state';
import * as ContactActions from '../../../core/store/contact/contact.actions';
import {Router} from '@angular/router';
import {AlertType} from '../../../core/enums/alert-type.enum';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  alertTypes = AlertType;

  submitted: boolean;
  sendDone: boolean;
  form: FormGroup;
  type: AlertType;

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.buildForm();
    this.submitted = false;
  }

  buildForm() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      object: new FormControl(null, Validators.required),
      message: new FormControl(null, Validators.required)
    });
  }

  contactHandler() {
    if (this.form.valid) {
      const contact = this.form.value as Contact;
      this.store.dispatch(ContactActions.sendMail({ contact }));
      this.type = AlertType.SUCCESS;
      this.sendDone = true;
      this.form.reset();
      this.submitted = false;
    } else {
      this.type = AlertType.DANGER;
      this.submitted = true;
    }
  }

  onClosed() {
    this.type = null;
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

}
