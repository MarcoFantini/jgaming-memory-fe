import {animate, state, style, transition, trigger} from '@angular/animations';
import {CellState} from '../enums/cell-state.enum';

export const VISIBLE_TO_COVERED_TIME = 300;
export const COVERED_TO_VISIBLE_TIME = 300;
export const VISIBLE_TO_MATCHED_TIME = 500;
export const SHOW_AND_COVER_GUSSET_TIME = VISIBLE_TO_COVERED_TIME + COVERED_TO_VISIBLE_TIME;

export const MemoryGussetAnimation = trigger('memory-gusset-animation', [
  state(CellState.COVERED, style({
    transform: 'rotateY(90deg)'
  })),
  state(CellState.VISIBLE, style({
    transform: 'rotateY(0deg)'
  })),
  state(CellState.MATCHED, style({
    transform: 'scale(0.001, 0.001)'
  })),
  transition(CellState.VISIBLE + '=>' + CellState.COVERED, animate(VISIBLE_TO_COVERED_TIME)),
  transition(CellState.COVERED + '=>' + CellState.VISIBLE,
    animate(COVERED_TO_VISIBLE_TIME.toString().concat('ms ').concat(VISIBLE_TO_COVERED_TIME.toString().concat('ms')))),
  transition(CellState.VISIBLE + '=>' + CellState.MATCHED, animate(VISIBLE_TO_MATCHED_TIME))
]);
