import {Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {distinctUntilChanged, map, takeUntil} from 'rxjs/operators';
import * as UserSelectors from '../../core/store/user/user.selectors';
import {AppState} from '../../app-state';
import {User} from '../store/user/model/user.model';

@Directive({
  selector: '[appIsLogged]'
})
export class IsLoggedDirective implements OnInit, OnDestroy {

  private destroy$ = new Subject();

  constructor(
    private template: TemplateRef<any>,
    private view: ViewContainerRef,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store
      .pipe(
        select(UserSelectors.getUser),
        map((user: User) => !!user.token),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(isLogged => {
        if (isLogged) {
          this.view.createEmbeddedView(this.template);
        } else if (!isLogged) {
          this.view.clear();
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.complete();
  }
}
