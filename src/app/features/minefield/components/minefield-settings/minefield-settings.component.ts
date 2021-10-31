import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MinefieldInstance} from '../../../../core/store/minefield/model/minefield-instance.model';

@Component({
  selector: 'app-minefield-settings',
  templateUrl: './minefield-settings.component.html',
  styleUrls: ['./minefield-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MinefieldSettingsComponent implements OnInit {

  @Input() instance: MinefieldInstance;
  @Output() back = new EventEmitter();
  @Output() edit = new EventEmitter<MinefieldInstance>();
  @Output() save = new EventEmitter<MinefieldInstance>();

  form: FormGroup;
  submitted: boolean;
  message: string;
  numCell: number;
  numCellSetting: number;
  cellError: boolean;
  lifeError: boolean;


  constructor() {
  }

  ngOnInit() {
    this.buildForm();
    this.cellError = true;
    this.lifeError = true;
    this.submitted = false;
  }

  buildForm() {
    if (!this.instance) {
      this.form = new FormGroup({
        columns: new FormControl(null, Validators.required),
        bombs: new FormControl(null, Validators.required),
        treasures: new FormControl(null, Validators.required),
        life: new FormControl(null, Validators.required),
        name: new FormControl(null, Validators.required)
      });
    } else {
      this.form = new FormGroup({
        columns: new FormControl(this.instance.columns, Validators.required),
        bombs: new FormControl(this.instance.bombs, Validators.required),
        treasures: new FormControl(this.instance.treasures, Validators.required),
        life: new FormControl(this.instance.life, Validators.required),
        name: new FormControl(this.instance.name, Validators.required)
      });
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      const instance = this.form.value as MinefieldInstance;
      this.numCell = instance.columns * instance.columns;
      this.numCellSetting = (instance.bombs * 1) + (instance.treasures * 1);
      this.cellError = this.numCellSetting < this.numCell;
      this.lifeError = (instance.life * 1) > 0;
      if (this.lifeError && this.cellError) {
        if (this.instance) {
          instance.id = this.instance.id;
          this.edit.emit(instance);
        } else {
          this.save.emit(instance);
        }
      }
    }
  }

  get f() {
    return this.form.controls;
  }

  backHandler() {
    this.back.emit();
  }
}
