import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {MinefieldInstance} from '../../../../core/store/minefield/model/minefield-instance.model';
import {Role} from '../../../../core/enums/role.enum';
import {Level} from '../../../../core/enums/level.enum';

@Component({
  selector: 'app-minefield-instances',
  templateUrl: './minefield-instances.component.html',
  styleUrls: ['./minefield-instances.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MinefieldInstancesComponent {

  @Input() instances: MinefieldInstance[];
  @Output() new = new EventEmitter<number>();
  @Output() play = new EventEmitter<number>();
  @Output() edit = new EventEmitter<MinefieldInstance>();
  @Output() delete = new EventEmitter<number>();

  roles = Role;
  levels = Level;

  constructor() { }

  newHandler() {
    this.new.emit();
  }

  playHandler(id: number) {
    this.play.emit(id);
  }

  deleteHandler(id: number) {
    this.delete.emit(id);
  }

  editHandler(instance: MinefieldInstance) {
    this.edit.emit(instance);
  }
}
