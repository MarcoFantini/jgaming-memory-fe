import {Validators} from '@angular/forms';

export const PAIR_NUMBERS_PATTERN = /^\d*[2468]$/;

export const pairNumberValidator = Validators.pattern(PAIR_NUMBERS_PATTERN);
