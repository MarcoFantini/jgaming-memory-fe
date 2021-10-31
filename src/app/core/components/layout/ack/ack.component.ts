import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Ack} from '../../../model/ack.model';

@Component({
  selector: 'app-ack',
  templateUrl: './ack.component.html',
  styleUrls: ['./ack.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AckComponent {

  @Input() ack: Ack;

}
