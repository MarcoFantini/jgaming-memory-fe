import {animate, state, style, transition, trigger} from '@angular/animations';
import {CellState} from '../enums/cell-state.enum';

export const VISIBLE_TO_COVERED_TIME = 200;
export const COVERED_TO_VISIBLE_TIME = 200;

export const MinefieldCellAnimation = trigger('hide-show', [
  state(CellState.COVERED, style({
    opacity: 0,
  })),
  state(CellState.VISIBLE, style({
    opacity: 1,
  })),
  transition(CellState.VISIBLE + '=>' + CellState.COVERED, animate(VISIBLE_TO_COVERED_TIME)),
  transition(CellState.COVERED + '=>' + CellState.VISIBLE,
    animate(COVERED_TO_VISIBLE_TIME.toString().concat('ms ').concat(VISIBLE_TO_COVERED_TIME.toString().concat('ms')))),
]);
