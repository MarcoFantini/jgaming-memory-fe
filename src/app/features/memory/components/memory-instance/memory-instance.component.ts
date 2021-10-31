import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Role} from '../../../../core/enums/role.enum';
import {MemoryInstance} from '../../../../core/store/memory/model/memory-instance.model';
import {ModalConfirmComponent} from '../../../../core/components/modals/modal-confirm/modal-confirm.component';
import {TranslateService} from '@ngx-translate/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {GameType} from '../../../../core/enums/game-type.enum';

@Component({
  selector: 'app-memory-instance',
  templateUrl: './memory-instance.component.html',
  styleUrls: ['./memory-instance.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemoryInstanceComponent {

  @Input() instances: MemoryInstance[];
  // tslint:disable-next-line:no-output-native
  @Output() play = new EventEmitter<number>();
  @Output() new = new EventEmitter<number>();
  @Output() edit = new EventEmitter<MemoryInstance>();
  @Output() delete = new EventEmitter<number>();

  roles = Role;

  constructor(
    private readonly translate: TranslateService,
    private readonly modalService: BsModalService,
  ) {
  }

  newHandler() {
    this.new.emit();
  }

  playHandler(id: number) {
    this.play.emit(id);
  }

  deleteHandler(id: number) {
    const initialState = {
      message: this.translate.instant('features.memory.settings.delete_message'),
      modalHeaderClass: GameType.MEMORY.toLowerCase()
    };
    this.modalService.show(ModalConfirmComponent, {
      initialState
    }).content.onClose.subscribe(() => {
      this.delete.emit(id);
    });
  }

  editHandler(instance: MemoryInstance) {
    this.edit.emit(instance);
  }
}
