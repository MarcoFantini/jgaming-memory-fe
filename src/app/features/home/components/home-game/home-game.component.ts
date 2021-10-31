import {ChangeDetectionStrategy, Component} from '@angular/core';
import {GameType} from '../../../../core/enums/game-type.enum';
import {GameCategory} from '../../../../core/enums/game-category.enum';

@Component({
  selector: 'app-home-game',
  templateUrl: './home-game.component.html',
  styleUrls: ['./home-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeGameComponent {

  private readonly configuration: Map<GameCategory, GameType[]> = new Map<GameCategory, GameType[]>();

  categories = this.getEnum(GameCategory);
  selectedCategory: GameCategory;
  games: GameType[];

  constructor() {
    this.configuration.set(GameCategory.ALL, [ GameType.MEMORY, GameType.BLACKJACK, GameType.MINEFIELD ]);
    this.configuration.set(GameCategory.CARDS, [ GameType.BLACKJACK ]);
    this.configuration.set(GameCategory.PUZZLE, [ GameType.MEMORY, GameType.MINEFIELD ]);
    this.configuration.set(GameCategory.IDLE, [  ]);
    this.filterHandler(GameCategory.ALL);
  }

  filterHandler(category: GameCategory) {
    this.selectedCategory = category;
    this.games = this.configuration.get(category);
  }

  getEnum(obj: any): any[] {
    return Object.keys(obj).filter(k => typeof obj[k as any] !== 'number');
  }
}
