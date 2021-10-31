import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MemoryInstance} from '../../../../core/store/memory/model/memory-instance.model';

const FTM = 1400;

@Component({
  selector: 'app-memory-settings',
  templateUrl: './memory-settings.component.html',
  styleUrls: ['./memory-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemorySettingsComponent implements OnInit {

  @Input() instance: MemoryInstance;
  @Output() back = new EventEmitter();
  @Output() edit = new EventEmitter<MemoryInstance>();
  @Output() save = new EventEmitter<MemoryInstance>();

  form: FormGroup;
  submitted: boolean;
  validConfig: boolean;
  errorPlayable: boolean;
  timePlayable: boolean;
  MinEC: number;
  TMin: number;

  constructor() {
  }

  ngOnInit() {
    this.buildForm();
    this.submitted = false;
    this.validConfig = true;
    this.timePlayable = true;
    this.errorPlayable = true;
  }

  buildForm() {
    if (!this.instance) {
      this.form = new FormGroup({
        columns: new FormControl(null, Validators.required),
        rows: new FormControl(null, Validators.required),
        maxErrors: new FormControl(null, Validators.required),
        victoryPoints: new FormControl(null, Validators.required),
        timer: new FormControl(null, Validators.required),
        name: new FormControl(null, Validators.required)
      });
    } else {
      this.form = new FormGroup({
        columns: new FormControl(this.instance.columns, Validators.required),
        rows: new FormControl(this.instance.rows, Validators.required),
        maxErrors: new FormControl(this.instance.maxErrors, Validators.required),
        victoryPoints: new FormControl(this.instance.victoryPoints, Validators.required),
        timer: new FormControl(this.instance.timer, Validators.required),
        name: new FormControl(this.instance.name, Validators.required)
      });
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) { // if form is valid
      const instance = this.form.value as MemoryInstance;
      this.MinEC = (instance.columns * instance.rows);
      this.TMin = FTM * this.MinEC;
      this.TMin = this.TMin + (1000 - (this.TMin % 1000));
      // tslint:disable-next-line:triple-equals
      if (instance.timer == 0) { // check if is a no time limits
        this.timePlayable = true;
      } else { // check if time limits make game playable
        this.timePlayable = (FTM * this.MinEC <= this.form.value.timer);
      }
      this.validConfig = ((this.MinEC % 2) === 0);
      this.errorPlayable = ((this.MinEC / 2) <= this.form.value.maxErrors);
      if (this.validConfig && this.timePlayable && this.errorPlayable) {
        // valid configuration, good time for playable game, good error for playable game
        if (this.instance) { // modify an existing instance if @input is not null
          if (!instance.id) { // on re click after first modify NOT update local-instance's id
            instance.id = this.instance.id;
          }
          this.edit.emit(instance);
        } else { // save new instance
          this.save.emit(instance);
        }
      }
    }
  }

  backHandler() {
    this.back.emit();
  }

  get f() {
    return this.form.controls;
  }
}
